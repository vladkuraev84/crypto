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
      <h1 class="form-wanda-title">Log in now</h1>
      <p>We are happy to have you back</p>
    </template>
    <template #main>
      <div>
        <Form @submit="onSubmit" v-slot="{ errors, isSubmitting }">
          <div
            :class="{ 'is-invalid-block': errors.email }"
            v-if="!phoneForm"
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

          <div
            class="form-input-block"
            :class="{ 'is-invalid-block': errors.password }"
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
                rules="passwordReq|verify_password_spaces|minLength:8|maxLength:30"
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
          <p class="mt-10">
            <router-link
              :to="$i18nRoute({ name: 'ChangePassword' })"
              class="btn btn-link"
              >I forgot my password</router-link
            >
          </p>

          <div class="form-wanda--btns">
            <button
              class="btn btn-white"
              :disabled="isSubmitting"
              :class="[
                {
                  disabled: errors.email || errors.password,
                },
                phoneForm
                  ? {
                      'not-allowed':
                        !phoneValid ||
                        phoneCode.length === 0 ||
                        passModel.length === 0,
                    }
                  : {
                      'not-allowed':
                        emailModel.length === 0 || passModel.length === 0,
                    },
              ]"
            >
              <Loader v-if="isSubmitting" />
              Sign In
            </button>
          </div>
        </Form>
      </div>
    </template>
    <template #bottomBlock>
      <router-link
          :to="$i18nRoute({ name: 'Register', params: { isPhoneForm: phoneForm } })"
          class="btn btn-link"
      >
        or Register
      </router-link>
    </template>
  </baseAuthLayout>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watchEffect} from "vue";
import { VueTelInput } from "vue-tel-input/dist/vue-tel-input.umd.min.js";
import "vue-tel-input/dist/vue-tel-input.css";
import baseAuthLayout from "@/blocks/Auth/BaseAuth/BaseAuthLayout.vue";
import { Field, Form, ErrorMessage, useForm } from "vee-validate";
import Loader from "@/blocks/Loader/Loader.vue";

import IconEmail from "@/components/Icons/IconEmail.vue";
import IconPassword from "@/components/Icons/IconPassword.vue";

import HeaderBtns from "@/components/Auth/HeaderBtns.vue";
import MixinValidate from "@/components/Auth/MixinValidate";
import { reactive } from "@vue/runtime-dom";
import { useStore } from "vuex";
import router from "@/router";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "Log In",
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
    const phoneCode = ref(0);
    const phoneValid = ref(false);
    let phoneData = reactive({ number: "" });
    let isPhoneInputClicked = false;

    const { isSubmitting } = useForm();

    const emailModel = ref("");
    const passModel = ref("");

    const verifyType: string = "login" as string;
    let iconVerify: string | undefined;

    const classHelperValidate = ref(new MixinValidate());

    watchEffect(() => {
      if (phoneForm.value) {
        emailModel.value = ''
        passModel.value = ''
        return (iconVerify = "Phone");
      } else {
        phoneCode.value = 0
        phoneValid.value = false
        phoneSelect.value = null
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

      let login = await store.dispatch("user/login", form).catch((error) => {
        store.dispatch("alerts/add", { text: error.message });
        return;
      });

      if (login) {
        const verifyData = {
          tokenId: login.id,
          type: verifyType,
          email: emailModel.value,
          phone: phoneData.number,
          iconVerify: iconVerify,
        };
        actions.resetForm();
        emailModel.value = passModel.value = "";
        localStorage.setItem("ud", JSON.stringify(verifyData) as any);
        await router.push({
          name: "Email-Phone",
          params: { tokenId: login.id, type: verifyType },
        });
      }
    }

    const onInputPhone = (value, dataPhone) => {
      phoneCode.value = dataPhone.formatted;
      phoneValid.value = dataPhone.valid;
      phoneData = { ...dataPhone };
    };

    return {
      phoneForm,
      onSubmit,
      isSubmitting,
      emailModel,
      passModel,
      phoneSelect,
      onInputPhone,
      phoneCode,
      classHelperValidate,
      phoneValid,
      isPhoneInputClicked,
    };
  },
});
</script>

<style lang="scss" scoped>
.loader {
  left: 10%;
}
</style>
