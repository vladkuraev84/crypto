<template>
  <div>Send to a Wallet</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "WithdrawToWallet",
  components: {},
  setup() {
    const store = useStore();
    const userData = store.getters["user/dataUser"];

    let balance = computed(() => {
      return store.getters["balance/getBalance"];
    });

    return {
      store,
      userData,
      balance,
    };
  },
});
</script>

<style lang="scss" scoped></style>
