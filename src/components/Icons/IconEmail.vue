<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 20 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 3.5L10 10L20 3.5V0H0V3.5Z" :fill="currentColor" />
    <path
      d="M10 11.5L0 4.8V13.8667C0 13.9114 0.00129346 13.9559 0.0038427 14H0V16H20V14H19.9962C19.9987 13.9559 20 13.9114 20 13.8667V4.8L10 11.5Z"
      :fill="currentColor"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: { type: [Number, String], default: 20 },
    height: { type: [Number, String], default: 16 },
    currentColor: { type: String, default: "#96ABE3" },
  },
};
</script>
