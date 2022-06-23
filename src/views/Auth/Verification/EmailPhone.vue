<template>
  <baseAuthLayout
    :header="false"
    :bottomBlock="false"
    :classTitleTxt="'verify-title-text'"
    :classMain="'verify-bottom'"
  >
    <template #titleTxt class="text-center">
      <h1 class="form-wanda-title">Security Verification</h1>
      <p>Enter a security verification code sent to</p>
      <p>
        {{
          userDataBeforeVerify.email
            ? strSub(3, 7, userDataBeforeVerify.email)
            : strSub(5, 10, userDataBeforeVerify.phone)
        }}
      </p>
      <p class="timer">{{ sec }} s</p>
    </template>
    <template #main>
      <div>
        <ConfirmCode @confirm="getConfirmCode" :data="userDataBeforeVerify" />
        <p class="text-center mt-20">
          <button class="btn btn-link" :disabled="sec > 0" @click="getCode">
            Get Code
          </button>
        </p>
        <div class="form-wanda--btns">
          <button
            class="btn btn-white"
            :disabled="sec === 0 || isButtonDisabled"
            @click="verifyHandler"
          >
            Sign In
          </button>
        </div>
      </div>
    </template>
  </baseAuthLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import baseAuthLayout from "@/blocks/Auth/BaseAuth/BaseAuthLayout.vue";
import { subString } from "@/filters/subString.ts";

import ConfirmCode from "@/components/Auth/ConfirmCode.vue";
import store from "@/store";
import router from "@/router";
import jwtDecode from "jwt-decode";

export default defineComponent({
  name: "Email-Phone",
  components: {
    baseAuthLayout,
    ConfirmCode,
  },
  data() {
    return {
      isButtonDisabled: false,
    };
  },
  setup() {
    const strSub = subString;
    let userDataBeforeVerify: any = JSON.parse(
      localStorage.getItem("ud") as any
    );
    let code = ref(0);
    const getConfirmCode = (value) => {
      code.value = value;
    };

    async function verifyHandler() {
      this.isButtonDisabled = true
      let auth = await store
        .dispatch("user/verifyLogRegStore", {
          verifyType: userDataBeforeVerify.type,
          userId: userDataBeforeVerify.tokenId,
          otpCode: code.value,
        })
        .catch((error) => {
          store.dispatch("alerts/add", { text: error.message });
          return;
        });

      if (auth) {
        localStorage.removeItem("ud");
        localStorage.setItem("token", auth);
        const userInfo = auth ? jwtDecode(auth) : undefined;
        store.commit("user/setUser", userInfo);
        await router.push({
          name: "WalletBalance",
        });
      }
      this.isButtonDisabled = false
    }

    let timer;
    const time = 60;
    let sec = ref(time);

    function countdown() {
      sec.value--;
      if (sec.value === 0) {
        clearTimeout(timer);
      } else {
        timer = setTimeout(countdown, 1000);
      }
    }

    const getCode = async () => {
      let req = await store
        .dispatch("user/verifyReSendStore", {
          userId: userDataBeforeVerify.tokenId,
        })
        .catch((error) => {
          store.dispatch("alerts/add", { text: error.message });
          return;
        });

      if (req) {
        sec.value = time;
        countdown();
      }
    };

    onMounted(() => {
      countdown();
    });

    /*const verifyHandler = await store
      .dispatch("user/verifyLogin", {
        userId: userDataBeforeVerify.tokenId,
        otpCode: code,
      })
      .catch((error) => {
        store.dispatch("alerts/add", { text: error.message });
        return;
      });*/

    return {
      getConfirmCode,
      code,
      userDataBeforeVerify,
      verifyHandler,
      getCode,
      timer,
      sec,
      strSub,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/css/utils/_variables.scss";

.loader {
  left: 10%;
}

.verify-title-text {
  p {
    color: $dark;

    + p {
      margin-top: 8px;
    }
  }
}

.timer {
  color: $grayLight;
}

.mt-20 {
  margin-top: 20px;
}

.btn.disabled,
.btn[disabled] {
  background: transparent !important;
}
</style>
