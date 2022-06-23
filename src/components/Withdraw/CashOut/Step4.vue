<template>
  <div class="white-block">
    <div class="input-block">
      <form @click="test" class="flex j-c-between">
        <label class="flex flex-col flex-1">
          <span class="label">Select ATM</span>
          <input type="text" v-model="searchATM" />
        </label>
        <button class="btn btn-white" :disabled="!searchATM">Search</button>
      </form>
    </div>
    <div class="cash-out--btns flex a-center j-c-center">
      <button class="btn btn-white">Back</button>
      <button class="btn btn-primary">Continue</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CashOutStep4",
  components: {},
  setup() {
    const searchATM = ref("");
    return {
      searchATM,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-block {
  form {
    align-items: end;
  }

  label {
    max-width: 520px;
    margin-right: 10px;
    position: relative;
  }

  .label {
    position: absolute;
    top: -36px;
  }

  .btn-white {
    width: auto;
    min-width: 135px;
    height: auto;
  }
}
</style>
