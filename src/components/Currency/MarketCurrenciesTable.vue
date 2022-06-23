<template>
  <BaseTable
    :rows="currencies"
    :columns="$options.columns"
    class="market-crypto-table"
  >
    <template v-slot:rowContent="{ row, columnName }">
      <template v-if="columnName === 'name'">
        <div class="market-crypto-table__name">
          <img
            class="market-crypto-table__logo"
            :src="row.logo"
            alt=""
            srcset=""
            width="24"
            height="24"
          />
          <span>
            {{ row.name }}
          </span>
        </div>
      </template>
      <template v-else-if="columnName === 'change24h'">
        <span
          :class="[
            {
              up: !row.change24hDisplay.includes('-'),
              down: row.change24hDisplay.includes('-'),
            },
          ]"
        >
          {{ row.change24hDisplay }}
        </span>
      </template>
      <template v-else-if="columnName === 'price'">
        <span
          :class="[
            {
              up: row.flag === 'up',
              down: row.flag === 'down',
            },
          ]"
        >
          {{ row.priceDisplay.split(" ")[0] }} {{ row.price.toFixed(2) }}
        </span>
      </template>
      <template v-else-if="columnName === 'buySell'">
        <RouterLink
          class="btn btn-white"
          :to="'/' + $i18n.locale + `/market/${row.name}/market-operations`"
          >Buy / Sell</RouterLink
        >
      </template>
      <template v-else>
        {{ row[`${columnName}Display`] }}
      </template>
    </template>
  </BaseTable>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BaseTable from "@/components/Currency/BaseTable.vue";
import { Currency } from "@/types/models";

export default defineComponent({
  components: {
    BaseTable,
  },
  columns: {
    name: {
      name: "Name",
      align: "left",
      padding: "custom-padding",
    },
    price: {
      name: "24 H Price",
      align: "right",
      padding: "custom-padding",
    },
    change24h: {
      name: "24 H Change",
      align: "right",
      padding: "custom-padding",
    },
    marketCap: {
      name: "Market Cap",
      align: "right",
      padding: "custom-padding",
    },
    buySell: {
      name: "",
      align: "right",
      padding: "custom-padding",
    },
  },
  props: {
    currencies: {
      type: Array as PropType<Currency[]>,
      default: () => null,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/css/utils/_variables.scss";

.market-crypto-table {
  &__name {
    display: flex;
    align-items: center;
  }
  &__logo {
    margin-right: 17px;
  }
}

.up {
  color: green;
}
.down {
  color: $red;
}

.btn {
  min-width: 100px;
  width: auto;
  display: inline-flex;
}
</style>
