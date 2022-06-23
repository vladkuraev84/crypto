<template>
  <baseAuthLayout>
    <template #header>

    </template>
    <template #titleTxt>
      <h1 class="form-wanda-title">Change password</h1>
    </template>
    <template #main>
      <div>
        <Form @submit="onSubmit" v-slot="{ errors, isSubmitting }">

          <div
            :class="{ 'is-invalid-block': errors.password }"
            class="form-input-block"
          >
            <label for="password" class="label">Password</label>
            <div class="input-icon flex a-center relative">
              <label for="password" class="label-icon">
                <IconPassword currentColor="currentColor" />
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                rules="required|minLength:8|verify_password"
                placeholder="Password"
                v-model="passModel"
                validateOnInput
              />
            </div>
            <p class="error">
              <transition name="slide-fade">
                <ErrorMessage name="password" />
              </transition>
            </p>
          </div>

          <div
            :class="{ 'is-invalid-block': errors.confirmation }"
            class="form-input-block"
          >
            <label for="confirmation" class="label">Confirm Password</label>
            <div class="input-icon flex a-center relative">
              <label for="confirmation" class="label-icon">
                <IconPassword currentColor="currentColor" />
              </label>
              <Field
                id="confirmation"
                name="confirmation"
                type="password"
                rules="required|confirmed:password"
                placeholder="Confirm Password"
                v-model="confPassModel"
                validateOnInput
              />
            </div>
            <p class="error">
              <transition name="slide-fade">
                <ErrorMessage name="confirmation" />
              </transition>
            </p>
          </div>

          <div class="form-wanda--btns">
            <button
              class="btn btn-white"
              :disabled="isSubmitting"
              :class="[
                {
                  disabled: errors.password || errors.confirmation,
                },
                phoneForm
                  ? {
                      'not-allowed':
                        passModel.length === 0 || confPassModel.length === 0,
                    }
                  : {
                      'not-allowed':
                        passModel.length === 0 || confPassModel.length === 0,
                    },
              ]"
            >
              <Loader v-if="isSubmitting" />
              Create New Password
            </button>
          </div>
        </Form>
      </div>
    </template>
    <template #bottomBlock>
      <p>
        I remembered password, go to
        <router-link :to="$i18nRoute({ name: 'Log In' })" class="btn btn-link"
          >Log in</router-link
        >.
      </p>
    </template>
  </baseAuthLayout>
</template>

<script lang="ts">
import "vue-tel-input/dist/vue-tel-input.css";

import { defineComponent, ref } from "vue";
import baseAuthLayout from "@/blocks/Auth/BaseAuth/BaseAuthLayout.vue";
import Loader from "@/blocks/Loader/Loader.vue";
import { Field, Form, ErrorMessage, useForm } from "vee-validate";

import IconPassword from "@/components/Icons/IconPassword.vue";

import { useStore } from "vuex";

export default defineComponent({
  name: "ChangePassword",
  components: {
    baseAuthLayout,
    Field,
    Form,
    ErrorMessage,
    IconPassword,
    Loader,
  },
  data() {
    return {
      bindProps: {
        mode: "international",
        autoFormat: true,
        defaultCountry: "USA",
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
    const store = useStore();

    const { isSubmitting } = useForm();

    const passModel = ref("");
    const confPassModel = ref("");

    async function onSubmit() {
      console.log('1');
    }


    return {
      onSubmit,
      isSubmitting,
      passModel,
      confPassModel,
    };
  },
});
</script>

<style lang="scss" scoped>
.loader {
  left: 10%;
}
</style>
