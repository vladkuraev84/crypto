<template>
  <section>
    <div class="schedule">
      <WalletBalanceSchedule />
    </div>
    <template v-if="balance">
      <ul v-for="(item, key) in balance" :key="key">
        <li>{{ item.asset }}: {{ item.amount }}</li>
      </ul>
    </template>
    <!--    <template v-if="currency">
      <template v-if="currency !== 'Not found'">
        <h1>{{ currency }}</h1>
        {{ balance }}
      </template>
    </template>-->
    <template v-else>
      <Loader />
    </template>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
// import { useTopCurrencies } from "@/composables/useTopCurrencies";
// import { useRoute } from "vue-router";
import { useStore } from "vuex";
// import { useCurrencyQuote } from "@/composables/useCurrencyQuote";
import WalletBalanceSchedule from "@/components/Wallet/WalletBalanceSchedule.vue";
import Loader from "@/blocks/Loader/Loader.vue";

export default defineComponent({
  name: "WalletBalance",
  components: { WalletBalanceSchedule, Loader },
  setup: function () {
    // const { currencies } = useTopCurrencies();
    // const route = useRoute();
    const store = useStore();

    /*let currentCurrency = computed(() => {
      return store.getters["balance/getCurrentCurrency"];
    });

    const currency: any = computed(() => {
      if (currencies.value !== null) {
        return (
          currencies.value.find(
            (currency) => currency.name === route.params.symbol
          ) || "Not found"
        );
      }
      return null;
    });

    const calcCrypto = computed(() => {
      return (
        Number(localStorage.getItem("balance")) / currency.value?.price
      ).toFixed(7);
    });

    const { getTopCurrencies } = useTopCurrencies();
    const { currencyQuote } = useCurrencyQuote();
    onMounted(() => getTopCurrencies(currencyQuote.value));*/

    onMounted(async () => {
      await store.dispatch("balance/getBalanceStore").catch((error) => {
        store.dispatch("alerts/add", { text: error.message });
        return error;
      });
    });

    let balance = computed(() => {
      return store.getters["balance/getAssets"];
    });

    return {
      balance,
      // currency,
      // currentCurrency,
      // calcCrypto,
    };
  },
});
</script>
