<template>
  <div class="chart">
    <div class="balance-buy-currency"></div>
    <LineChart
      style="display: none"
      class="chart__line"
      v-if="currencyOHLCV"
      v-bind="lineChartProps"
    />
    <div v-else class="text-center">
      <Loader style="position: static" />
    </div>
    <div class="period-switch" style="display: none">
      <ul class="flex a-center j-c-center">
        <li><button class="btn">Today</button></li>
        <li><button class="btn">Last Week</button></li>
        <li><button class="btn">Last Month</button></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  Chart,
  LineController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
} from "chart.js";
import { LineChart, useLineChart } from "vue-chart-3";
import Loader from "@/blocks/Loader/Loader.vue";
import { useCurrencyOHLCV } from "@/composables/useCurrencyOHLCV";
Chart.register(
  LineController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Title
);

export default defineComponent({
  name: "WalletBalanceSchedule",
  components: {
    LineChart,
    Loader,
  },
  setup() {
    const { currencyOHLCV } = useCurrencyOHLCV(7);

    const dataWallet = [
      { time: "", amount: "0" },
      { time: "", amount: "10000" },
      { time: "", amount: "5000" },
      { time: "", amount: "2000" },
      { time: "", amount: "0" },
      { time: "", amount: "1000" },
      { time: "", amount: "1500" },
    ];

    const chartData = computed(() => {
      let labels: any = [];
      let data: any = [];
      if (dataWallet) {
        for (let elem of dataWallet) {
          labels.push(elem.time);
          data.push(elem.amount);
        }
      }
      return {
        labels,
        datasets: [
          {
            data,
          },
        ],
      };
    });

    const options = computed(() => ({
      animation: true,
      interaction: {
        mode: "index",
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: true,
          },
          ticks: {
            callback: function (value: number) {
              return value >= 1000 ? `${value / 1000}K` : value.toFixed(2);
            },
          },
        },
      },
      layout: {
        padding: {
          top: 50,
          left: 10,
          right: 10,
          bottom: 20,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Balance",
        },
      },
    }));

    const { lineChartProps } = useLineChart({
      chartData,
      options,
    });

    return { currencyOHLCV, lineChartProps, options };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/css/utils/_variables.scss";
</style>
