<template>
  <div class="">
    <h1 class="title text-center"><strong>Market</strong></h1>
    <div class="input-block search-block">
      <span class="icon-search"><IconSearch /></span>
      <input type="text" v-model="search" placeholder="Search cryptocurrency" />
    </div>
    <MarketCurrenciesTable :currencies="currenciesArray" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import MarketCurrenciesTable from "@/components/Currency/MarketCurrenciesTable.vue";
import IconSearch from "@/components/Icons/IconSearch.vue";
import { useTopCurrencies } from "@/composables/useTopCurrencies";
import { useCurrencyQuote } from "@/composables/useCurrencyQuote";
import { useCurrenciesTicker } from "@/composables/useCurrenciesTicker";

export default defineComponent({
  name: "Market",
  components: { MarketCurrenciesTable, IconSearch },
  setup: function () {
    const { getTopCurrencies } = useTopCurrencies();
    const { currencyQuote } = useCurrencyQuote();
    let search = ref("");

    const { currenciesTicker } = useCurrenciesTicker();

    const currenciesArray = computed(() => {
      const temp: any = [];
      for (const currency in currenciesTicker.value) {
        temp.push({ ...currenciesTicker.value[currency] });
      }
      return temp.length == 0
        ? null
        : temp.filter((n) => {
            return n.name.toLowerCase().includes(search.value.toLowerCase());
          });
    });

    onMounted(() => getTopCurrencies(currencyQuote.value));

    const { currencies, searchQuery } = useTopCurrencies();

    return { currencies, searchQuery, currenciesArray, search };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/css/utils/_variables.scss";

.search-block {
  max-width: 444px;
  position: relative;
  margin: auto auto 40px;

  input {
    border-color: $primary;
    padding-left: 50px;
  }
}

.icon-search {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 38px;
  border-right: 1px solid $primary;
}

.table__cell {
  padding: 10px 20px;
}

input {
  &::placeholder {
    opacity: 0.5;
  }
}
</style>
