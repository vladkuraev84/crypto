<template>
  <div>
    <TheHeaderSteps />
    <CashOutStep1 v-if="$store.getters['persistedState/getStep1'].flag" />
    <CashOutStep2 v-if="!$store.getters['persistedState/getStep1'].flag" />
    <CashOutStep3 v-if="atmFlag" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import TheHeaderSteps from "@/components/Withdraw/CashOut/TheHeaderSteps.vue";
import CashOutStep1 from "@/components/Withdraw/CashOut/Step1.vue";
import CashOutStep2 from "@/components/Withdraw/CashOut/Step2.vue";
import CashOutStep3 from "@/components/Withdraw/CashOut/Step3.vue";

export default defineComponent({
  name: "WithdrawCashOut",
  components: { TheHeaderSteps, CashOutStep1, CashOutStep2, CashOutStep3 },
  setup() {
    const store = useStore();
    const phoneBlockFlag = ref(false);
    const atmFlag = ref(false);
    const userData = store.getters["user/dataUser"];

    let balance = computed(() => {
      return store.getters["balance/getBalance"];
    });

    return {
      store,
      userData,
      balance,
      phoneBlockFlag,
      atmFlag,
    };
  },
});
</script>

<style lang="scss" scoped></style>
