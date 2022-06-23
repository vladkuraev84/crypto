<template>
  <div class="white-block">
    <div class="input-block--wr flex a-center">
      <div class="input-block flex a-center flex-1">
        <div class="flex-1">
          <!--          <span class="flag flex a-center j-c-center flex-col">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_757_1946"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="40"
                height="40"
              >
                <circle cx="20" cy="20" r="20" fill="#0085FF" />
              </mask>
              <g mask="url(#mask0_757_1946)">
                <rect x="-1" y="20" width="42" height="20" fill="#FAFF0D" />
                <rect x="-1" width="42" height="20" fill="#0D7CFF" />
              </g>
            </svg>
          </span>
          <strong>+380</strong>-->
          <p class="label"><strong>Confirm Your Phone Number</strong></p>
          <vue-tel-input
            id="tel"
            v-model="phoneSelect"
            name="tel"
            mode="auto"
            type="tel"
            v-bind="bindProps"
            validCharactersOnly
            ref="vueTel"
            @on-input="onInputPhone"
            @click="isPhoneInputClicked = true"
          />
          <p v-if="isPhoneInputClicked && !phoneValid" class="error">
            <transition name="slide-fade">
              <span>Please put your phone number</span>
            </transition>
          </p>
        </div>
        <!--        <label class="ml-10 flex-1">
          <p class="label"><strong>Confirm Your Phone Number</strong></p>
          <input type="number" v-model="phoneForm" />
        </label>-->
      </div>
    </div>
    <div class="cash-out--btns flex a-center j-c-center">
      <button
        class="btn btn-white"
        @click="
          $store.commit('persistedState/setStep1', { amount: 0, flag: true })
        "
      >
        Back
      </button>
      <button class="btn btn-white" :disabled="!phoneForm">Continue</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { VueTelInput } from "vue-tel-input/dist/vue-tel-input.umd.min.js";
import "vue-tel-input/dist/vue-tel-input.css";
import { reactive } from "@vue/runtime-dom";

export default defineComponent({
  name: "CashOutStep2",
  components: { VueTelInput },
  data() {
    return {
      bindProps: {
        mode: "international",
        autoFormat: true,
        disabledFetchingCountry: false,
        autoDefaultCountry: false,
        dropdownOptions: {
          showSearchBox: true,
          showFlags: true,
          showDialCodeInList: true,
          showDialCodeInSelection: false,
          tabindex: false,
        },
        inputOptions: {
          autocomplete: "off",
          autofocus: true,
          ariaDescribedby: "Test",
          showDialCode: true,
          tabindex: false,
          maxlength: 22,
          placeholder: "Enter you phone",
          required: true,
          type: "tel",
          invalidMsg: "wrong type",
        },
        validCharactersOnly: true,
      },
    };
  },
  setup() {
    const phoneSelect = ref(null);
    const phoneForm = ref(false);
    const phoneCode = ref(0);
    const phoneValid = ref(false);
    let phoneData = reactive({ number: "" });
    let isPhoneInputClicked = false;

    const onInputPhone = (value, dataPhone) => {
      phoneCode.value = dataPhone.formatted;
      phoneValid.value = dataPhone.valid;
      phoneData = { ...dataPhone };
    };

    return {
      phoneSelect,
      phoneForm,
      phoneCode,
      phoneValid,
      phoneData,
      onInputPhone,
      isPhoneInputClicked,
    };
  },
});
</script>

<style lang="scss" scoped>
/*label {
  position: relative;
}
.label {
  position: absolute;
  top: -36px;
}*/
</style>
