<template>
  <div class="white-block verification-block">
    <h2 class="title-sub text-center">Verify Your Identity</h2>
    <ul class="verification-list">
      <li class="verification-step--done">
        <p class="text-center">
          You have KYC Level
          <span v-if="verificationDetail.level === 'Zero'">0</span>
          <span v-if="verificationDetail.level === 'One'">1</span>
          <span v-if="verificationDetail.level === 'Two'">2</span>
        </p>
      </li>
      <li
        :class="{
          'verification-step--locked': verificationDetail.level !== 'Zero',
        }"
      >
        <div class="verification-block--info">
          <p><strong>KYC level 1</strong></p>
          <p>To be able to cash out/withdraw up to 10000 EUR a day</p>
        </div>
        <router-link
          :class="{ disabled: verificationDetail.level !== 'Zero' }"
          :to="$i18nRoute({ name: 'SumsubPage', params: { tokenId: userId } })"
          class="btn btn-link"
        >
          <span v-if="verificationDetail.level === 'Zero'">Verify</span>
          <span v-if="verificationDetail.level !== 'Zero'" class="green"
            >Verified</span
          >
        </router-link>
      </li>
      <li class="verification-step--locked">
        <div class="verification-block--info">
          <p><strong>KYC level 2 (locked)</strong></p>
          <p>Complete KYC Level 1 to unlock</p>
          <span class="is-invalid"
            >Sorry, this step in development process :(</span
          >
        </div>
        <!--        <div v-else class="verification-block&#45;&#45;info">
          <p><strong>KYC level 2</strong></p>
          <p>To be able to unlimited cash out/withdraw</p>
        </div>-->
        <button class="btn btn-link disabled">Verify</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Verification",
  components: {},
  setup() {
    const store = useStore();
    let userId = store.getters["user/nameIdentifier"];

    onMounted(async () => {
      await store
        .dispatch("user/getUserStore", {
          userId: userId,
        })
        .catch((error) => {
          store.dispatch("alerts/add", { text: error.message });
          return error;
        });
    });

    let verificationDetail = computed(() => {
      return store.getters["user/verificationDetail"];
    });

    return { userId, verificationDetail };
  },
});
</script>
