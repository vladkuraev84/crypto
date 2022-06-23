<template>
  <div class="">
    <router-view v-slot="{ Component, route }">
      <div :key="route.name">
        <component :is="Component" />
      </div>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MarketBase",
  components: {},
});
</script>
