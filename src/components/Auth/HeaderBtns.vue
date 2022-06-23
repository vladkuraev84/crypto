<template>
  <ul class="form-wanda-header__btns">
    <li>
      <button
        class="btn btn-tab"
        @click="$emit('switchStateBlockFalse', false)"
        :class="[!phoneForm ? 'btn-active' : '']"
      >
        Email
      </button>
    </li>
    <li>
      <button
        class="btn btn-tab"
        @click="$emit('switchStateBlockTrue', true)"
        :class="[phoneForm ? 'btn-active' : '']"
      >
        Phone Number
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderBtns",
  props: {
    phoneForm: Boolean,
  },

  setup(props) {
    props.phoneForm;
  },
});
</script>
