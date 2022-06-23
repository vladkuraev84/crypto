<template>
  <div class="confirms-component">
    <div class="confirms--block">
      <input
        ref="number"
        v-model="code"
        autofocus
        class="hide"
        type="number"
        name="code"
        @keyup.enter="$emit('confirm', code)"
        @input="
          $emit('confirm', code),
            $event.target.value.length < lengthCode + 1
              ? (code = $event.target.value)
              : (code = $event.target.value.slice(0, lengthCode))
        "
      />
      <div class="confirms-blocks">
        <div
          v-for="(val, i) in lengthCode"
          :key="i"
          class="number"
          @click="$refs.number.focus()"
        >
          {{ code.length === i ? "" : String(code).charAt(i) }}
          <span
            v-if="
              code.length === i ||
              (i === lengthCode - 1 && code.length === lengthCode)
            "
            class="flick"
            >|</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ConfirmCode",
  components: {},
  props: {
    data: {
      type: Object,
      required: false,
    },
  },
  setup() {
    const number: any = ref(null);
    const route = useRoute();
    const code = ref("");
    const lengthCode = 6;

    function submitData() {
      number.value.focus();
    }

    return {
      number,
      code,
      submitData,
      lengthCode,
      route,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/css/utils/_variables.scss";

.hide {
  position: absolute;
  top: -9999px;
}

.flick {
  font-size: 0;
}

.hide:focus + .confirms-blocks .flick {
  font-size: 18px;
  -webkit-animation: flick 1s step-end infinite;
  animation: flick 1s step-end infinite;
}

@keyframes flick {
  0% {
    color: #000000;
  }
  50% {
    color: white;
  }
}

.number {
  width: 30px;
  height: 30px;
  border: 1px solid rgba(16, 104, 193, 0.15);
  font-size: 18px;
  position: relative;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.confirms-blocks {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
