<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 11 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1 0C0.447715 0 0 0.447715 0 1V19C0 19.5523 0.447715 20 1 20H10C10.5523 20 11 19.5523 11 19V1C11 0.447715 10.5523 0 10 0H1ZM5.5 1.7627C5.77614 1.7627 6 1.53884 6 1.2627C6 0.986553 5.77614 0.762695 5.5 0.762695C5.22386 0.762695 5 0.986553 5 1.2627C5 1.53884 5.22386 1.7627 5.5 1.7627ZM1.50003 2.00003C1.22387 2.00001 1 2.22387 1 2.50003V16.5C1 16.7761 1.22386 17 1.5 17H9.5C9.77614 17 10 16.7761 10 16.5V2.50045C10 2.22432 9.77616 2.00047 9.50003 2.00045L1.50003 2.00003ZM6.39961 18.4C6.39961 18.8971 5.99667 19.3 5.49961 19.3C5.00255 19.3 4.59961 18.8971 4.59961 18.4C4.59961 17.9029 5.00255 17.5 5.49961 17.5C5.99667 17.5 6.39961 17.9029 6.39961 18.4Z"
      :fill="currentColor"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: { type: [Number, String], default: 11 },
    height: { type: [Number, String], default: 20 },
    currentColor: { type: String, default: "#96ABE3" },
  },
};
</script>
