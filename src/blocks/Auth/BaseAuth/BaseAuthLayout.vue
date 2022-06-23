<template>
  <!-- SLOTS:
    1 - header
    2 - titleTxt
    3 - main
    4 - bottomBlock
   -->
  <div class="form-wanda-wr">
    <div class="form-wanda" :class="className">
      <div v-if="header" class="form-wanda-header" :class="classHeader">
        <slot name="header"></slot>
      </div>

      <div v-if="titleTxt" class="form-wanda-title-txt" :class="classTitleTxt">
        <slot name="titleTxt"></slot>
      </div>

      <div v-if="main" class="form-wanda-main" :class="classMain">
        <slot name="main"></slot>
      </div>

      <div
        v-if="bottomBlock"
        class="form-wanda-bottom-block"
        :class="classBottom"
      >
        <slot name="bottomBlock"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import basePopup from "@/blocks/Auth/BaseAuth/BaseAuth.ts";

export default defineComponent({
  name: "Dashboard",
  components: {},
  extends: basePopup,
});
</script>

<style lang="scss">
@import "~@/assets/css/utils/variables";
@import "./form-auth.scss";
</style>
