<template>
  <div class="header">
    <div class="container">
      <div class="logo flex a-center">
        <router-link :to="$i18nRoute({ name: 'Dashboard' })">
          <IconLogo />
        </router-link>
      </div>
      <Menu />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconLogo from "@/components/Icons/IconLogo.vue";
import Menu from "@/components/Menu/Menu.vue";

export default defineComponent({
  name: "TheHeader",
  components: { IconLogo, Menu },
});
</script>

<style lang="scss" scoped>
.logo {
  padding: 0 8px;

  a {
    display: inline-flex;
    align-items: center;
    width: 50px;
    height: 23px;
  }
  svg {
    max-width: 50px;
  }
}
</style>
