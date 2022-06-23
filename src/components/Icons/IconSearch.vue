<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.7324 13.8714C10.5369 14.6632 9.10336 15.1243 7.56208 15.1243C3.38566 15.1243 0 11.7386 0 7.56215C0 3.38569 3.38566 0 7.56208 0C11.7385 0 15.1242 3.38569 15.1242 7.56215C15.1242 9.10344 14.6631 10.537 13.8713 11.7325L20.0004 17.8617L17.8615 20.0006L11.7324 13.8714ZM13.6242 7.56215C13.6242 10.9102 10.9101 13.6243 7.56208 13.6243C4.2141 13.6243 1.5 10.9102 1.5 7.56215C1.5 4.2141 4.2141 1.5 7.56208 1.5C10.9101 1.5 13.6242 4.2141 13.6242 7.56215Z"
      :fill="currentColor"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: { type: [Number, String], default: 20 },
    height: { type: [Number, String], default: 20 },
    currentColor: { type: String, default: "#96ABE3" },
  },
};
</script>
