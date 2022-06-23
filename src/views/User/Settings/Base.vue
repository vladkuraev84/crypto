<template>
  <div>
    <h1 class="title text-center">Settings</h1>
    <ul class="user-menu flex a-center j-c-center">
      <li>
        <router-link
          :to="$i18nRoute({ name: 'SettingsSecurity' })"
          class="user-menu-link"
          >Security</router-link
        >
      </li>
      <li>
        <router-link
          :to="$i18nRoute({ name: 'SettingsVerification' })"
          class="user-menu-link"
          >Verification</router-link
        >
      </li>
    </ul>
    <router-view v-slot="{ Component, route }">
      <transition name="slide-fade">
        <div :key="route.name">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "SettingsBase",
  components: {},
  setup() {
    const store = useStore();
    let userId = store.getters["user/nameIdentifier"];

    return { userId };
  },
});
</script>
