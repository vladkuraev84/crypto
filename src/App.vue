<template>
  <Alerts />
  <TheHeader />
  <div class="container flex flex-1">
    <Nav />
    <div class="main">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "@/components/TheHeader/TheHeader.vue";
import Nav from "@/components/Nav/Nav.vue";
import Alerts from "@/components/Alerts/Alerts.vue";

export default defineComponent({
  name: "Home",
  components: { TheHeader, Nav, Alerts },
});
</script>

<style lang="scss">
@import "~@/assets/css/styles.scss";
</style>
