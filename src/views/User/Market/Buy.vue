<template>
  <section>
    <template v-if="currency">
      <template v-if="currency !== 'Not found'">
        <div class="market-block market--buy">
          <div class="market-block-header flex j-c-between">
            <span>Your Balance</span>
            <strong
              >{{ balance }}
              {{ currentCurrency }}
              <!--              {{ currency.priceDisplay.replace(/ [\s\S]+/, "") }}-->
            </strong>
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
              <input
                type="number"
                :placeholder="'0 ' + currentCurrency"
                v-model="amountInput"
                @input="checkAmount"
              />
              <p class="crypto-value small">
                {{ calcCrypto }}
                {{ currency.name }}
              </p>
            </div>
            <div class="short-list">
              <ul class="flex a-center j-c-between">
                <li v-for="(item, key) in shortList" :key="key">
                  <button
                    class="btn btn-white"
                    :disabled="balance < item.amount || balance === 0"
                    @click="amountInput = item.amount"
                    :class="{ active: amountInput == item.amount }"
                  >
                    {{ item.title }}
                    {{ !item.title.includes("Max") ? currentCurrency : "" }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="market-block-btns flex j-c-center">
            <button
              class="btn btn-white"
              :disabled="
                !amountInput || amountInput === 0 || amountInput > balance
              "
              @click="confirmModal = true"
            >
              Continue
            </button>
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
    <BaseModalLayout
      v-if="confirmModal"
      @closeModal="confirmModal = !confirmModal"
    >
      <template #header></template>
      <template #titleTxt
        ><h1 class="title text-center">Confirm to Buy</h1></template
      >
      <template #main
        ><p class="text-center">
          {{ calcCrypto }} {{ currency.name }}
        </p></template
      >
      <template #bottomBlock>
        <div class="text-center">
          <button class="btn btn-primary" @click="confirmOperation">
            Confirm
          </button>
        </div>
      </template>
    </BaseModalLayout>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useTopCurrencies } from "@/composables/useTopCurrencies";
import { useRoute } from "vue-router";
import { useCurrencyQuote } from "@/composables/useCurrencyQuote";
import Loader from "@/blocks/Loader/Loader.vue";
import { useStore } from "vuex";
import BaseModalLayout from "@/blocks/Modal/Base/BaseModalLayout.vue";
import router from "@/router";

export default defineComponent({
  name: "MarketBuy",
  components: { BaseModalLayout, Loader },
  setup: function () {
    const { currencies } = useTopCurrencies();
    const route = useRoute();
    const store = useStore();
    const amountInput = ref();
    const confirmModal = ref(false);

    let balance = computed(() => {
      return store.getters["balance/getBalance"];
    });

    let currentCurrency = computed(() => {
      return store.getters["balance/getCurrentCurrency"];
    });

    const shortList = [
      { id: 0, amount: 20, title: "20" },
      { id: 1, amount: 50, title: "50" },
      { id: 2, amount: 100, title: "100" },
      { id: 3, amount: balance.value, title: "Max" },
    ];

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
      return (amountInput.value / currency.value?.price).toFixed(7);
    });

    const { getTopCurrencies } = useTopCurrencies();
    const { currencyQuote } = useCurrencyQuote();
    onMounted(() => getTopCurrencies(currencyQuote.value));

    const checkAmount = () => {
      if (amountInput.value > balance.value) {
        return store.dispatch("alerts/add", {
          text: "You do not have enough balance. Please increase your balance.",
        });
      }
    };

    const confirmOperation = () => {
      confirmModal.value = !confirmModal.value;
      router.push({
        name: "WalletBase",
      });
      return store.dispatch("alerts/add", {
        text: `You have successfully bought ${calcCrypto.value} ${currency.value.name}`,
        performance: "success",
      });
    };

    return {
      currency,
      balance,
      shortList,
      currentCurrency,
      amountInput,
      checkAmount,
      confirmOperation,
      confirmModal,
      calcCrypto,
    };
  },
});
</script>
