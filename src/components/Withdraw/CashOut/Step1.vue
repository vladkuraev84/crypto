<template>
  <div class="white-block">
    <div class="input-block--wr flex a-center">
      <div class="flex flex-col flex-1">
        <div class="input-block flex a-center">
          <div class="flex a-center">
            <span class="flag flex a-center j-c-center flex-col"
              ><IconEuroFlag
            /></span>
            <strong>EUR</strong>
          </div>
          <label class="ml-10 flex-1">
            <span class="label"><strong>Amount</strong></span>
            <input
              type="number"
              v-model="amount"
              :placeholder="'0 ' + balanceEur[0].asset"
              min="0"
            />
          </label>
        </div>
      </div>
      <button
        class="btn btn-white"
        @click="amount = balanceEur[0].amount"
        :disabled="amount >= balanceEur[0].amount"
      >
        Max Amount
      </button>
    </div>
    <p class="balance">
      <small
        >Balance in {{ balanceEur[0].asset }}:
        <span>{{ balanceEur[0].amount }}</span></small
      >
    </p>
    <p
      v-if="amount > balanceEur[0].amount || amount < 0"
      class="error text-center"
    >
      The value you entered does not match your balance!
    </p>
    <div class="cash-out--btns flex a-center j-c-center">
      <button
        class="btn btn-white"
        :disabled="!amount || amount > balanceEur[0].amount || amount < 0"
        @click="amountHandler"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import IconEuroFlag from "@/components/Icons/IconEuroFlag.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "CashOutStep1",
  components: { IconEuroFlag },
  setup() {
    const amount = ref("");
    const store = useStore();

    // const emit = defineEmits(["phoneBlockShow"]);

    onMounted(async () => {
      await store.dispatch("balance/getBalanceStore").catch((error) => {
        store.dispatch("alerts/add", { text: error.message });
        return error;
      });
    });

    let balanceEur = computed(() => {
      const assets = store.getters["balance/getAssets"];
      return assets.filter((item) => item.asset === "EUR");
    });

    const amountHandler = () => {
      store.commit("persistedState/setStep1", {
        amount: amount.value,
        flag: false,
      });
    };

    return { amount, balanceEur, amountHandler };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/css/utils/variables";

.flag {
  margin-right: 18px;
}
label {
  position: relative;
}

.label {
  position: absolute;
  top: -36px;
}

.balance {
  color: $gray;
  padding-left: 118px;
}
</style>
