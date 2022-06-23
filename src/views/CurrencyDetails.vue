<template>
  <section :class="['currency', { loading: currency == null }]">
    <template v-if="currency">
      <template v-if="currency !== 'Not found'">
        <div class="currency__row">
          <h2 class="currency__elem currency__header">
            <img
              :src="currency.logo"
              alt="currency.fullName"
              srcset=""
              width="34"
              height="34"
            />
            <p class="currency__header-text">
              <span>{{ currency.fullName }} Price</span>
              <span class="currency__symbol">{{ currency.name }} </span>
            </p>
          </h2>
          <div class="currency__elem currency__price">
            {{ currency.price }}
            <span
              :class="[
                'currency__change',
                {
                  up: !currency.change24hDisplay.includes('-'),
                  down: currency.change24hDisplay.includes('-'),
                },
              ]"
            >
              {{ currency.change24hDisplay }}
            </span>
          </div>
        </div>
        <div class="currency__chart currency__elem">
          <CurrencyDetailsChart />
        </div>
        <CurrencyDetailsHistoTable
          class="currency__elem"
          :currencyName="currency.fullName"
          :currencySymbol="currency.name"
        />
      </template>
      <template v-else>
        <div>Currency not found in Top 10 cryptocurrencies.</div>
      </template>
    </template>
    <template v-else>
      <Loader />
    </template>
  </section>
</template>

<script lang="ts">
import { useTopCurrencies } from "@/composables/useTopCurrencies";
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  onMounted,
} from "vue";
import { useRoute } from "vue-router";
import Loader from "@/blocks/Loader/Loader.vue";
import CurrencyDetailsHistoTable from "@/components/Currency/CurrencyDetailsHistoTable.vue";
import { useCurrencyQuote } from "@/composables/useCurrencyQuote";

export default defineComponent({
  name: "CurrencyDetails",
  components: {
    Loader,
    CurrencyDetailsChart: defineAsyncComponent(
      () => import("@/components/Currency/CurrencyDetailsChart.vue")
    ),
    CurrencyDetailsHistoTable,
  },
  setup() {
    const { currencies } = useTopCurrencies();
    const route = useRoute();

    const currency = computed(() => {
      if (currencies.value !== null) {
        return (
          currencies.value.find(
            (currency) => currency.name === route.params.symbol
          ) || "Not found"
        );
      }
      return null;
    });

    const { getTopCurrencies } = useTopCurrencies();
    const { currencyQuote } = useCurrencyQuote();
    onMounted(() => getTopCurrencies(currencyQuote.value));

    return { currency };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/css/utils/_variables.scss";

.currency {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;

  &__elem {
    margin: 2rem 0;
  }
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    &--center {
      justify-content: center;
    }
  }
  &__header {
    display: flex;
    align-items: center;
    font-weight: 700;
  }
  &__header-text {
    margin-left: 1.5vw;
  }
  &__symbol {
    margin-left: 0.25em;
    font-size: 0.5em;
    align-self: flex-end;
  }
  &__price {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  &__change {
    margin-left: 0.5em;
    padding: 0.5em;
    color: #fff;
    background-color: var(--secondary);
    font-size: 0.75em;
  }
  &__chart {
    width: 100%;
  }
}

.up {
  background-color: green;
}
.down {
  background-color: $red;
}
</style>
