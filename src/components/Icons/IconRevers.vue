<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.2931 18L8.58619 12.0218L10.4849 10.2057L12.8443 12.5448V0H15.7417V12.5448L18.1013 10.2057L20 12.0218L14.2931 18Z"
      :fill="currentColor"
    />
    <path
      d="M5.70691 0L0 5.97823L1.89869 7.79428L4.2581 5.45522V18H7.15551V5.45522L9.51512 7.79428L11.4138 5.97823L5.70691 0Z"
      :fill="currentColor"
    />
  </svg>
</template>

<script>
export default {
  name: "IconRevers",
  props: {
    width: { type: [Number, String], default: 20 },
    height: { type: [Number, String], default: 18 },
    currentColor: { type: String, default: "#96ABE3" },
  },
};
</script>
