<template>
  <div class="sumsub-page">
    <Sumsub />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sumsub from "@/components/Sumsub/Sumsub.vue";

export default defineComponent({
  name: "SumsubPage",
  components: { Sumsub },
});
</script>
