<template>
  <div v-if="isVerifyAllow" id="sumsub-websdk-container"></div>
  <div v-else>Disabled</div>
</template>

<script>
import snsWebSdk from "@sumsub/websdk";
import * as baseURL from "@/api/http";
import router from "@/router";

export default {
  name: "SumsubComponent",
  data() {
    return {
      externalUserId: this.$store.getters["user/nameIdentifier"],
      userStore: this.$store.state.user.user,
      externalTempUserId: "",
      isVerifyAllow: true,
    };
  },
  async created() {
    const verificationDetail = await this.$store.dispatch("user/getUserStore", {
      userId: this.externalUserId,
    });
    if (verificationDetail && verificationDetail.level !== "Zero") {
      this.isVerifyAllow = false;
      return;
    }
    this.getNewAccessToken(this.externalUserId).then(async (response) => {
      const data = await response.clone().json();
      this.externalTempUserId = data.data.userId;
      this.launchWebSdk(data.data.token);
    });
  },
  methods: {
    launchWebSdk(accessToken, applicantEmail, applicantPhone) {
      let snsWebSdkInstance = snsWebSdk
        .init(accessToken, () => this.getNewAccessToken(this.externalUserId))
        .withConf({
          lang: "en",
          email: applicantEmail,
          phone: applicantPhone,
          // i18n: {"document": {"subTitles": {"IDENTITY": "Upload a document that proves your identity"}}},
          onMessage: (type, payload) => {
            console.log("WebSDK onMessage", type, payload);
          },
          uiConf: {
            // customCssStr: ":root {\n  --black: #000000;\n   --grey: #F5F5F5;\n  --grey-darker: #B2B2B2;\n  --border-color: #DBDBDB;\n}\n\np {\n  color: var(--black);\n  font-size: 16px;\n  line-height: 24px;\n}\n\nsection {\n  margin: 40px auto;\n}\n\ninput {\n  color: var(--black);\n  font-weight: 600;\n  outline: none;\n}\n\nsection.content {\n  background-color: var(--grey);\n  color: var(--black);\n  padding: 40px 40px 16px;\n  box-shadow: none;\n  border-radius: 6px;\n}\n\nbutton.submit,\nbutton.back {\n  text-transform: capitalize;\n  border-radius: 6px;\n  height: 48px;\n  padding: 0 30px;\n  font-size: 16px;\n  background-image: none !important;\n  transform: none !important;\n  box-shadow: none !important;\n  transition: all 0.2s linear;\n}\n\nbutton.submit {\n  min-width: 132px;\n  background: none;\n  background-color: var(--black);\n}\n\n.round-icon {\n  background-color: var(--black) !important;\n  background-image: none !important;\n}"
          },
          onError: (error) => {
            console.error("WebSDK onError", error);
          },
        })
        .withOptions({ addViewportTag: false, adaptIframeHeight: true })
        .on("stepCompleted", (payload) => {
          console.log("stepCompleted", payload);
        })
        .on("onError", (error) => {
          console.log("onError", error);
        })
        .onMessage(async (type, payload) => {
          console.log("onMessage", type, payload);

          let aId = "";

          if (type === "idCheck.onApplicantLoaded") {
            this.aId = payload.applicantId;
          }

          if (type === "idCheck.onApplicantSubmitted") {
            let onApplicantSubmittedTesteComplete = await this.$store
              .dispatch("user/sumsubTestCompleteStore", {
                applicantId: this.aId,
                externalUserId: this.externalTempUserId,
              })
              .catch((error) => {
                this.$store.dispatch("alerts/add", { text: error.message });
                return error;
              });

            if (onApplicantSubmittedTesteComplete) {
              let newonApplicantSubmittedTesteComplete = {
                ...onApplicantSubmittedTesteComplete,
                CorrelationId: "",
                InspectionId: "",
                LevelName: "",
                ReviewStatus: "",
                Type: "",
              };
              return fetch(
                `${baseURL.default.defaults.baseURL}/Verification/sumsub`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(newonApplicantSubmittedTesteComplete),
                }
              ).then(async (res) => {
                console.log(
                  "Request /Verification/sumsub complete! response:",
                  res
                );
                if (res.status === 200) {
                  router.push({
                    name: "SettingsVerification",
                  });
                }
              });
            }
          }
        })
        .build();
      snsWebSdkInstance.launch("#sumsub-websdk-container");
    },
    getNewAccessToken(externalUserId) {
      console.log(
        "getNewAccessToken-> Creating an access token for initializng SDK..."
      );
      return fetch(
        `${baseURL.default.defaults.baseURL}/Verification/${externalUserId}/accessToken`
      );
    },
  },
};
</script>
