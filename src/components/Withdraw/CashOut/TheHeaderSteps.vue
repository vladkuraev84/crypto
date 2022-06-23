<template>
  <div class="header-steps">
    <ul class="header-steps--list">
      <li>
        <div class="step active step-1">
          <span>Amount</span>
        </div>
      </li>
      <li>
        <div
          class="step step-2"
          :class="{ active: !$store.getters['persistedState/getStep1'].flag }"
        >
          <span>Phone Number</span>
        </div>
      </li>
      <li>
        <div class="step step-3">
          <span>Select ATM</span>
        </div>
      </li>
      <li>
        <div class="step step-4">
          <span>Confirm Transaction</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheHeaderSteps",
  components: {},
});
</script>

<style lang="scss" scoped></style>
