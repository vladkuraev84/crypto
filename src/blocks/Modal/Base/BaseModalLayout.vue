<template>
  <!-- SLOTS:
    1 - header
    2 - titleTxt
    3 - main
    4 - bottomBlock
   -->
  <div class="modal-wr animate__fadeOutUp" @click.self="$emit('closeModal')">
    <div class="modal" :class="className">
      <div class="closeBtn" @click="$emit('closeModal')">
        <slot name="closeicon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M13.5919 11.88C14.0719 12.36 14.0719 13.1067 13.5919 13.5867C13.3519 13.8267 13.0586 13.9333 12.7386 13.9333C12.4186 13.9333 12.1253 13.8267 11.8853 13.5867L7.00526 8.70666L2.12525 13.5867C1.88525 13.8267 1.59193 13.9333 1.27193 13.9333C0.951927 13.9333 0.658607 13.8267 0.418607 13.5867C-0.0613932 13.1067 -0.0613932 12.36 0.418607 11.88L5.29859 6.99999L0.418607 2.11999C-0.0613932 1.63999 -0.0613932 0.893318 0.418607 0.413319C0.898607 -0.0666814 1.64525 -0.0666814 2.12525 0.413319L7.00526 5.29331L11.8853 0.413319C12.3653 -0.0666814 13.1119 -0.0666814 13.5919 0.413319C14.0719 0.893318 14.0719 1.63999 13.5919 2.11999L8.7119 6.99999L13.5919 11.88Z"
              fill="#E73348"
            />
          </svg>
        </slot>
      </div>

      <div v-if="header" class="modal-header" :class="classHeader">
        <slot name="header"></slot>
      </div>

      <div v-if="titleTxt" class="modal-title-txt" :class="classTitleTxt">
        <slot name="titleTxt"></slot>
      </div>

      <div v-if="main" class="modal-main" :class="classMain">
        <slot name="main"></slot>
      </div>

      <div v-if="bottomBlock" class="modal-bottom-block" :class="classBottom">
        <slot name="bottomBlock"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import baseModal from "@/blocks/Modal/Base/BaseModal.ts";

export default defineComponent({
  name: "Dashboard",
  components: {},
  extends: baseModal,
});
</script>

<style lang="scss">
@import "~@/assets/css/utils/variables";
@import "./modal.scss";
</style>
