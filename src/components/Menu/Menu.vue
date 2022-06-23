<template>
  <div class="menu flex-1 flex a-center j-c-between">
    <div class="menu-list">
      <ul>
        <li>
          <router-link
            :to="$i18nRoute({ name: 'WithdrawBase' })"
            class="menu-link"
            >Withdraw</router-link
          >
        </li>
        <li>
          <router-link
            :to="$i18nRoute({ name: 'Deposit' })"
            @click="closeDepositBalance"
            class="menu-link"
            >Deposit</router-link
          >
        </li>
      </ul>
    </div>
    <div class="menu-option">
      <ul>
        <li><SwitchLang /></li>
        <li class="flex a-center">
          <strong v-if="$store.getters['user/isLogin']" class="balance">{{
            balance
          }}</strong>
          <Dropdown />
        </li>
        <li v-if="$store.getters['user/isLogin']">
          <button class="btn btn-out" @click="signOut">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0L6.55196 3.67439V20L0 16.5V0Z" fill="#96ABE3" />
              <path
                d="M17.7231 5L20 8.38829L17.7231 11.7766L16.5489 11L17.8336 9.08829L15.1199 9.0881V7.68829H17.8336L16.5489 5.77658L17.7231 5Z"
                fill="#96ABE3"
              />
              <path
                d="M2.51998 0H15.1199L15.1199 7.68829H12.0959V9.0881H15.1199L15.1199 17H8.06395V3L2.51998 0Z"
                fill="#96ABE3"
              />
            </svg>
            Sign out
          </button>
        </li>
        <li v-else>
          <!--          :to="{ name: 'Log In', params: { locale: $i18n.locale } }"-->
          <router-link :to="$i18nRoute({ name: 'Log In' })" class="menu-link"
            >Sign In</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Dropdown from "@/components/Dropdown/Dropdown.vue";
import SwitchLang from "@/components/SwitchLang/SwitchLang.vue";
import router from "@/router";
import { useStore } from "vuex";

export default defineComponent({
  name: "Menu",
  components: { Dropdown, SwitchLang },
  data() {
    return {
      logIn: false,
    };
  },
  setup() {
    const store = useStore();

    const closeDepositBalance = () => {
      store.commit("user/setVoucherFlag", true);
    };

    let balance = computed(() => {
      return store.getters["balance/getBalance"];
    });

    const signOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("balance");
      store.commit("user/setUser", null);
      router.push({
        name: "Log In",
      });
    };

    return { signOut, balance, closeDepositBalance };
  },
});
</script>

<style lang="scss" scoped>
.balance {
  margin-right: 8px;
}
</style>
