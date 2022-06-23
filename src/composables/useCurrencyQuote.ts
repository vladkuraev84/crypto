import { reactive, toRefs } from "vue";

const state = reactive({
  currencyQuote: "USD",
});

const CURRENCIES = ["USD", "EUR", "NOK", "JPY", "AUD", "CHF"];

export function useCurrencyQuote() {
  return { ...toRefs(state), CURRENCIES };
}
