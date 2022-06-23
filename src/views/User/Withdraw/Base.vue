<template>
  <div class="withdraw-wr">
    <h1 class="title text-center"><strong>Withdraw</strong></h1>
    <div v-if="!store.getters['user/isLogin']" class="not-logged">
      <p class="text-center">
        <router-link :to="$i18nRoute({ name: 'Log In' })" class="btn btn-link"
          >Sign In</router-link
        >
        To Withdraw
      </p>
    </div>
    <div v-else>
      <ul class="user-menu flex a-center j-c-center">
        <li>
          <router-link
            :to="$i18nRoute({ name: 'WithdrawToWallet' })"
            class="user-menu-link"
            >Send To A Wallet</router-link
          >
        </li>
        <li>
          <router-link
            :to="$i18nRoute({ name: 'WithdrawCashOut' })"
            class="user-menu-link"
            >Cash Out</router-link
          >
        </li>
      </ul>
      <router-view v-slot="{ Component, route }">
        <div :key="route.name">
          <component :is="Component" />
        </div>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "WithdrawBase",
  components: {},
  setup() {
    const store = useStore();
    const userData = store.getters["user/dataUser"];

    let balance = computed(() => {
      return store.getters["balance/getBalance"];
    });

    return {
      store,
      userData,
      balance,
    };
  },
});
</script>

<style lang="scss" scoped></style>
