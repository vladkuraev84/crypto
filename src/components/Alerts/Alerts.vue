<template>
  <div class="alerts-box">
    <transition-group name="item" tag="div">
      <div
        class="item"
        v-for="alert in alerts"
        :key="alert.id"
        :class="alert.performance"
      >
        {{ alert.text }}
        <button class="btn btn-close" @click="remove({ id: alert.id })">
          close
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters({ alerts: "alerts/all" }),
  },
  methods: {
    ...mapMutations({ remove: "alerts/remove" }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/utils/variables";
.alerts-box {
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  z-index: 1000;
  padding: 10px;
}

.item {
  margin: 10px;
  background-color: #444;
  border-radius: 4px;
  padding: 16px 10px 10px;
  color: #ffffff;
  position: relative;

  &.success {
    background-color: $green;
  }
}

.item {
  &-enter-active {
    animation: fadeIn 0.5s;
  }
  &-live-active {
    animation: fadeOut 0.5s;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.btn-close {
  position: absolute;
  right: 4px;
  top: 4px;
}
</style>
