<template>
  <Security />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Security from "@/components/Settings/Security.vue";

export default defineComponent({
  name: "SettingsSecurity",
  components: { Security },
});
</script>
