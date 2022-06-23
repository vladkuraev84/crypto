<template>
  <baseAuthLayout>
    <template #header>
      <HeaderBtns
        @switchStateBlockFalse="phoneForm = false"
        @switchStateBlockTrue="phoneForm = true"
        :phoneForm="phoneForm"
      />
    </template>
    <template #titleTxt>
      <h1 class="form-wanda-title">Register now</h1>
      <p>Welcome to Wanda Exchange</p>
    </template>
    <template #main>
      <div>
        <Form @submit="onSubmit" v-slot="{ errors, isSubmitting }">
          <div
            v-if="!phoneForm"
            :class="{ 'is-invalid-block': errors.email }"
            class="form-input-block"
          >
            <label for="email" class="label">Email</label>
            <div class="input-icon flex a-center relative">
              <label for="email" class="label-icon">
                <IconEmail currentColor="currentColor" />
              </label>
              <Field
                id="email"
                name="email"
                rules="emailReq"
                placeholder="Email"
                v-model="emailModel"
                rulues="required"
              />
            </div>
            <p class="error">
              <transition name="slide-fade">
                <ErrorMessage name="email" />
              </transition>
            </p>
          </div>

          <div v-else class="form-input-block">
            <label for="tel" class="label">Phone Number</label>
            <vue-tel-input
              v-model="phoneSelect"
              mode="auto"
              type="tel"
              v-bind="bindProps"
              validCharactersOnly
              @on-input="onInputPhone"
            />
            <p v-if="!phoneValid" class="error">
              <transition name="slide-fade">
                <span>
                  Please put your phone number
                </span>
              </transition>
            </p>
          </div>

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
                rules="passwordReq|verify_password_spaces|minLength:8|_password_latin|_password_specCharacter|maxLength:30|_password_uppercaseL|_password_lowercaseL|_password_number"
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
                rules="requiredConfirm|confirmed:password|passwordReq|verify_password_spaces|minLength:8|_password_latin|maxLength:30|_password_uppercaseL|_password_lowercaseL|_password_number|_password_specCharacter"
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
                  disabled:
                    errors.email || errors.password || errors.confirmation,
                },
                phoneForm
                  ? {
                      'not-allowed':
                        !phoneValid ||
                        passModel.length === 0 ||
                        confPassModel.length === 0,
                    }
                  : {
                      'not-allowed':
                        emailModel.length === 0 ||
                        passModel.length === 0 ||
                        confPassModel.length === 0,
                    },
              ]"
            >
              <Loader v-if="isSubmitting" />
              Create Account
            </button>
          </div>
        </Form>
      </div>
    </template>
    <template #bottomBlock>
      <p>
        Have an account?
        <router-link
            :to="$i18nRoute({ name: 'Log In', params: { isPhoneForm: phoneForm } })"
            class="btn btn-link"
        >
          Log in
        </router-link>.
      </p>
    </template>
  </baseAuthLayout>
</template>

<script lang="ts">
import { VueTelInput } from "vue-tel-input/dist/vue-tel-input.umd.min.js";
import "vue-tel-input/dist/vue-tel-input.css";

import {defineComponent, onMounted, ref, watchEffect} from "vue";
import baseAuthLayout from "@/blocks/Auth/BaseAuth/BaseAuthLayout.vue";
import Loader from "@/blocks/Loader/Loader.vue";
import { Field, Form, ErrorMessage, useForm } from "vee-validate";

import IconEmail from "@/components/Icons/IconEmail.vue";
import IconPassword from "@/components/Icons/IconPassword.vue";

import MixinValidate from "@/components/Auth/MixinValidate";
import HeaderBtns from "@/components/Auth/HeaderBtns.vue";
import { reactive } from "@vue/runtime-dom";
import { useStore } from "vuex";
import router from "@/router";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "Register",
  components: {
    baseAuthLayout,
    Field,
    Form,
    ErrorMessage,
    IconEmail,
    IconPassword,
    Loader,
    VueTelInput,
    HeaderBtns,
  },

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
    const route = useRoute()
    const store = useStore();
    const phoneSelect = ref(null);
    const phoneForm = ref(false);
    const phoneValid = ref(false);
    let phoneData = reactive({ number: "" });

    const { isSubmitting } = useForm();

    const emailModel = ref("");
    const passModel = ref("");
    const confPassModel = ref("");

    const verifyType: string = "signUp" as string;
    let iconVerify: string | undefined;

    const classHelperValidate = ref(new MixinValidate());

    watchEffect(() => {
      if (phoneForm.value) {
        emailModel.value = "";
        passModel.value = "";
        confPassModel.value = "";
        return (iconVerify = "Phone");
      } else {
        phoneSelect.value = null;
        phoneValid.value = false;
        passModel.value = "";
        confPassModel.value = "";
        return (iconVerify = "Email");
      }
    });

    onMounted(() => {
      if(route.params.isPhoneForm) {
        phoneForm.value = route.params.isPhoneForm === 'true'
      }
    })

    async function onSubmit(values: any, actions: any) {
      var form: any;
      if (phoneForm.value) {
        if (!phoneValid.value) {
          return;
        }
        form = {
          phone: phoneData.number,
          password: values.password,
        };
      } else {
        form = {
          email: values.email,
          password: values.password,
        };
      }

      let reg = await store
        .dispatch("user/registration", form)
        .catch((error) => {
          console.log(error);
          store.dispatch("alerts/add", { text: error.message });
          return;
        });

      if (reg) {
        const verifyData = {
          tokenId: reg.id,
          type: verifyType,
          email: emailModel.value,
          phone: phoneData.number,
          iconVerify: iconVerify,
        };
        actions.resetForm();
        emailModel.value = passModel.value = confPassModel.value = "";
        localStorage.setItem("ud", JSON.stringify(verifyData) as any);
        await router.push({
          name: "Email-Phone",
          params: {
            tokenId: reg.id,
            type: verifyType,
          },
        });
      }
    }

    const onInputPhone = (value, dataPhone) => {
      phoneValid.value = dataPhone.valid;
      phoneData = { ...dataPhone };
    };

    return {
      phoneForm,
      onSubmit,
      isSubmitting,
      emailModel,
      passModel,
      confPassModel,
      phoneSelect,
      onInputPhone,
      classHelperValidate,
      phoneValid,
    };
  },
});
</script>

<style lang="scss" scoped>
.loader {
  left: 10%;
}
</style>
