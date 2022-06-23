<template>
  <section>
    <template v-if="currency">
      <template v-if="currency !== 'Not found'">
        <div class="market-block market--buy">
          <div class="market-block-header flex j-c-between">
            <span>Your Balance</span>
            <strong
              >{{ balance }}
              {{ currency.priceDisplay.replace(/ [\s\S]+/, "") }}</strong
            >
          </div>
          <div class="market-block-main">
            <p class="market-block-crypto text-center flex a-center j-c-center">
              <img
                :src="currency.logo"
                alt="currency.fullName"
                srcset=""
                width="24"
                height="24"
              />
              {{ currency.fullName }}
            </p>
            <div class="input-block">
              <input type="text" placeholder="0" />
              <p class="crypto-value small">0 {{ currency.name }}</p>
            </div>
            <div class="short-list">
              <ul class="flex a-center j-c-between">
                <li>
                  <button class="btn btn-white">20 EUR</button>
                </li>
                <li>
                  <button class="btn btn-white">50 EUR</button>
                </li>
                <li>
                  <button class="btn btn-white">100 EUR</button>
                </li>
                <li>
                  <button class="btn btn-white">Max</button>
                </li>
              </ul>
            </div>
          </div>
          <div class="market-block-btns flex j-c-center">
            <button class="btn btn-white">Continue</button>
          </div>
        </div>
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
import { computed, defineComponent, onMounted } from "vue";
import { useTopCurrencies } from "@/composables/useTopCurrencies";
import { useRoute } from "vue-router";
import { useCurrencyQuote } from "@/composables/useCurrencyQuote";
import Loader from "@/blocks/Loader/Loader.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MarketSell",
  components: { Loader },
  setup() {
    const { currencies } = useTopCurrencies();
    const route = useRoute();
    const store = useStore();

    let balance = computed(() => {
      return store.getters["balance/getBalance"];
    });

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

    return { currency, balance };
  },
});
</script>
