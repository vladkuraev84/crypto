<template>
  <div class="">
    <ul class="market-menu flex a-center j-c-center">
      <li>
        <router-link
          :to="$i18nRoute({ name: 'MarketBuy' })"
          class="user-menu-link"
          >Buy</router-link
        >
      </li>
      <li>
        <router-link
          :to="$i18nRoute({ name: 'MarketSell' })"
          class="user-menu-link"
          >Sell</router-link
        >
      </li>
    </ul>
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
  name: "MarketOperations",
  components: {},
});
</script>
