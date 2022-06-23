<template>
  <div class="withdraw">
    <div class="withdraw-form">
      <div class="label"><p>Amount</p></div>
      <div class="withdraw-from">
        <div class="withdraw-currency-block">
          <div class="currency-block"></div>
          <input type="text">
        </div>
      </div>
      <div class="flex a-center withdraw-form__revers"><IconRevers /></div>
      <div class="withdraw-to">
        <div class="withdraw-currency-block">
          <div class="currency-block"></div>
          <input type="text">
        </div>
      </div>
      <div class="withdraw-form__btns"><button class="btn btn-white">Withdraw</button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconRevers from "@/components/Icons/IconRevers.vue";

export default defineComponent({
  name: "Withdraw",
  components: { IconRevers },
});
</script>

<style lang="scss" scoped>
.btn-white {
  width: auto;
  margin: auto;
  min-width: 180px;
}
</style>
