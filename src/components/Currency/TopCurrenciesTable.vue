<template>
  <BaseTable :rows="currencies" :columns="$options.columns">
    <template v-slot:rowContent="{ row, columnName }">
      <RouterLink
        class="table__cell-inner"
        :to="'/' + $i18n.locale + `/currencies/${row.name}`"
      >
        <template v-if="columnName === 'name'">
          <div class="top-crypto-table__name">
            <img
              class="top-crypto-table__logo"
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
        <template v-else>
          {{ row[`${columnName}Display`] }}
        </template>
      </RouterLink>
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
    },
    price: {
      name: "Price",
      align: "right",
    },
    change24h: {
      name: "Change (24h)",
      align: "right",
    },
    marketCap: {
      name: "Market Cap",
      align: "right",
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

.top-crypto-table {
  &__name {
    display: flex;
    align-items: center;
    padding-left: 56px;
  }
  &__logo {
    margin-right: 15px;
  }
}

.up {
  color: green;
}
.down {
  color: $red;
}
</style>
