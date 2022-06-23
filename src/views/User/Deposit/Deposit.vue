<template>
  <div class="deposit">
    <h1 class="title text-center"><strong>Deposit with a voucher</strong></h1>
    <div v-if="!store.getters['user/isLogin']" class="not-logged">
      <p class="text-center">
        <router-link :to="$i18nRoute({ name: 'Log In' })" class="btn btn-link"
          >Sign In</router-link
        >
        to deposit
      </p>
    </div>
    <div v-else>
      <div
        v-if="store.getters['user/getVoucherFlag']"
        class="deposit-block text-center"
      >
        <h2 class="title-sub">
          Fill in a code from a voucher below to deposit fiat on your balance
        </h2>
        <p>Please enter your 12-character code</p>
        <Form @submit="redeemVoucher" v-slot="{ isSubmitting }">
          <Field
            id="voucher"
            name="text"
            placeholder="____/____/____"
            v-mask="'XXXX/XXXX/XXXX'"
            v-model="getVoucher"
          />
          <!--          <input type="text" v-model="getVoucher" />-->
          <div class="deposit-block--btns flex j-c-center">
            <button class="btn btn-white" :disabled="getVoucher.length < 14">
              <Loader v-if="isSubmitting" />
              Redeem Voucher
            </button>
          </div>
        </Form>
      </div>
      <div v-else class="deposit-block text-center">
        <span class="close" @click="store.commit('user/setVoucherFlag', true)"
          >&#10799;</span
        >
        <p>Voucher has been successfully redeemed.</p>
        <p>
          Your current balance is:
          <strong
            >{{ balance }}
            {{ $store.getters["balance/getCurrentCurrency"] }}</strong
          >
        </p>
        <div class="deposit-block--btns flex j-c-around">
          <router-link
            :to="$i18nRoute({ name: 'Market' })"
            class="btn btn-primary"
            >Buy Crypto</router-link
          >
          <router-link
            :to="$i18nRoute({ name: 'Dashboard' })"
            class="btn btn-white"
            >Ok</router-link
          >
        </div>
      </div>
      <!--      <div class="deposit-block text-center">
        <p>
          The new deposit address has been sent to your email
          <strong v-if="userData.emailaddress">{{
            strSub(3, 7, userData.emailaddress)
          }}</strong
          ><strong v-else>{{ strSub(3, 7, userData.mobilephone) }}</strong> to
          provide the security of your assets. Please make sure the address is
          correct in order not to loose your assets.
        </p>
        <div class="deposit-block&#45;&#45;btns flex j-c-center">
          <button class="btn btn-primary">Confirm</button>
        </div>
      </div>
      <div class="deposit-block">
        <div class="input-block">
          <p><span class="label">Select Coin</span></p>
          <select>
            <option>Etherium</option>
          </select>
        </div>
        <div class="input-block">
          <p><span class="label">Select Network</span></p>
          <select>
            <option>Etherium</option>
          </select>
        </div>
        <div class="deposit-block&#45;&#45;btns flex j-c-center">
          <button class="btn btn-primary">Generate Deposit Address</button>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { subString } from "@/filters/subString.ts";
import { Field, Form, useForm } from "vee-validate";
import Loader from "@/blocks/Loader/Loader.vue";
import { mask } from "vue-the-mask";

export default defineComponent({
  name: "Deposit",
  components: {
    Field,
    Form,
    Loader,
  },
  directives: { mask },
  setup() {
    const store = useStore();
    const userData = store.getters["user/dataUser"];
    const strSub = subString;
    const getVoucher = ref("");
    let voucherFlag = ref(true);
    const { isSubmitting } = useForm();

    const redeemVoucher = async () => {
      console.log(getVoucher.value);
      const voucher = await store
        .dispatch("balance/getVoucher", {
          voucher: getVoucher.value.replace(/\//g, "-").toUpperCase(),
        })
        .catch((error) => {
          store.dispatch("alerts/add", { text: error.message });
          return;
        });
      if (voucher !== undefined) {
        voucherFlag.value = false;
        getVoucher.value = "";
        await store.dispatch("balance/getBalanceStore").catch((error) => {
          store.dispatch("alerts/add", { text: error.message });
          return;
        });
        store.commit("user/setVoucherFlag", false);
      }
    };

    let balance = computed(() => {
      return store.getters["balance/getBalance"];
    });

    return {
      store,
      userData,
      strSub,
      getVoucher,
      voucherFlag,
      redeemVoucher,
      balance,
      isSubmitting,
    };
  },
});
</script>

<style lang="scss" scoped></style>
