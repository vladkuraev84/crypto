<template>
  <article class="chart">
    <LineChart
      class="chart__line-chart"
      v-if="currencyOHLCV"
      v-bind="lineChartProps"
    />
    <div v-else class="text-center">
      <Loader style="position: static" />
    </div>
  </article>
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
import { useRoute } from "vue-router";
import { useCurrencyQuote } from "@/composables/useCurrencyQuote";
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
  components: {
    LineChart,
    Loader,
  },
  setup() {
    const { currencyQuote } = useCurrencyQuote();
    const route = useRoute();

    const { currencyOHLCV } = useCurrencyOHLCV(30);

    const chartData = computed(() => {
      let labels: any = [];
      let data: any = [];
      if (currencyOHLCV.value) {
        for (let elem of currencyOHLCV.value) {
          labels.push(elem.timeDisplay);
          data.push(elem.close);
        }
      }
      return {
        labels,
        datasets: [
          {
            backgroundColor: "rgb(239, 84, 67)",
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
      plugins: {
        title: {
          display: true,
          text: `${route.params.symbol} to ${currencyQuote.value} Price Chart (30 Days)`,
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
.chart {
  width: 100%;
  border-radius: 10px;
  background-color: $white;
  &__line-chart {
    width: 100%;
  }
  &__spinner {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
