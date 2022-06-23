<template>
  <div>
    <div class="dashboard text-center">
      <IconLogo />
      <h1 class="title">
        <strong>{{ $t("dashboard.withdraw") }}</strong>
        {{ $t("dashboard.your") }}
        <strong>{{ $t("dashboard.crypto") }}</strong>
        {{ $t("dashboard.inYourLocalCur") }}
        <strong>{{ $t("dashboard.instantly") }}</strong>
      </h1>
    </div>
    <Withdraw />
    <section class="top-crypto">
      <TopCurrenciesTable :currencies="currenciesArray" />
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import IconLogo from "@/components/Icons/IconLogo.vue";
import Withdraw from "@/components/Withdraw/Withdraw.vue";
import TopCurrenciesTable from "@/components/Currency/TopCurrenciesTable.vue";
import { useTopCurrencies } from "@/composables/useTopCurrencies.ts";
import { useCurrencyQuote } from "@/composables/useCurrencyQuote";
import { useCurrenciesTicker } from "@/composables/useCurrenciesTicker";

export default defineComponent({
  name: "Dashboard",
  components: { IconLogo, Withdraw, TopCurrenciesTable },
  setup: function () {
    const { getTopCurrencies } = useTopCurrencies();
    const { currencyQuote } = useCurrencyQuote();

    const { currenciesTicker } = useCurrenciesTicker();

    const currenciesArray = computed(() => {
      const temp: any = [];
      for (const currency in currenciesTicker.value) {
        temp.push({ ...currenciesTicker.value[currency] });
      }
      return temp.length == 0 ? null : temp;
    });

    onMounted(() => getTopCurrencies(currencyQuote.value));

    const { currencies, searchQuery } = useTopCurrencies();

    return { currencies, searchQuery, currenciesArray };
  },
});
</script>

<style lang="scss" scoped>
.withdraw {
  margin-top: 40px;
  margin-bottom: 60px;
}
</style>
