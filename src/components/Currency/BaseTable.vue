<template>
  <div class="table-outer">
    <div class="table-inner">
      <table class="table">
        <thead class="table__header">
          <tr>
            <th
              scope="col"
              v-for="(column, columnName) of columns"
              :data-col="columnName"
              :key="columnName"
              class="table__cell"
              :class="{
                'pl-name': columnName === 'name',
                'custom-padding': column.padding,
              }"
            >
              <div
                :class="[
                  'table__cell-inner',
                  'table__cell-inner--flex',
                  column.align,
                ]"
              >
                <span>
                  {{ column.name }}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody
          class="table__body"
          role="alert"
          :aria-live="alertActive"
          :aria-busy="ariaBusy"
        >
          <tr v-if="rows == null">
            <td
              class="text-center"
              :colspan="Object.keys(columns).length"
              style="padding: 12px"
            >
              <Loader style="position: static" />
            </td>
          </tr>
          <tr v-else-if="rows.length === 0">
            <td class="text-center" :colspan="Object.keys(columns).length">
              Data not found
            </td>
          </tr>
          <template v-else>
            <tr class="table__row" v-for="row in rows" :key="row">
              <td
                v-for="(column, columnName) of columns"
                :key="columnName"
                :class="['table__cell', column.align, column.padding]"
                :data-col="columnName"
              >
                <slot
                  name="rowContent"
                  :row="row"
                  :value="row[columnName]"
                  :columnName="columnName"
                >
                  <div class="table__cell-inner">
                    <slot
                      :name="columnName"
                      :row="row"
                      :value="row[columnName]"
                      :columnName="columnName"
                    >
                      {{ row[columnName] }}
                    </slot>
                  </div>
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from "vue";
import Loader from "@/blocks/Loader/Loader.vue";

interface Column {
  name: string;
  align: "center" | "left" | "right";
  padding: "custom-padding";
}

export default defineComponent({
  name: "BaseTable",
  components: {
    Loader,
  },
  props: {
    columns: {
      type: Object as PropType<{ [key: string]: Column }>,
      required: true,
    },
    rows: {
      type: Array as PropType<{ [key: string]: string }[]>,
      default: null,
    },
  },
  setup(props) {
    const alertActive = ref("polite");
    const ariaBusy = ref(true);

    watchEffect(() => {
      if (props.rows !== null) {
        alertActive.value = "off";
        ariaBusy.value = false;
      }
    });

    return {
      alertActive,
      ariaBusy,
    };
  },
});
</script>
<style lang="scss">
@import "~@/assets/css/utils/_variables.scss";

.table-outer {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 30px;
  max-height: 465px;
}

.table-inner {
  position: relative;
  //overflow-x: auto;
  //overflow-y: hidden;
  padding: 4px;
}

.table {
  display: table;
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  overflow-x: auto;
  white-space: nowrap;

  &__header {
    font-weight: 600;
    color: $grayLight;

    th {
      padding: 8px 18px;
    }
  }

  &__body {
    font-weight: 300;
    background: $white;

    td {
      border-top: 1px solid rgba(70, 127, 237, 0.1);
      height: 60px;
    }

    .table__cell-inner {
      padding: 17px;
    }
  }

  &__row {
    &:hover {
      box-shadow: 0 0 4px 1px rgba(16, 104, 193, 0.3);

      a {
        cursor: pointer;
      }
    }
  }

  &__cell {
    vertical-align: middle;

    &:first-child {
      position: sticky;
      left: 0;
      border-top-color: transparent;
    }
  }

  &__cell-inner {
    display: block;

    &--flex {
      display: flex;
      align-items: center;
    }
  }
}

.pl-name {
  .table__cell-inner {
    padding-left: 60px;
  }
  &.custom-padding {
    .table__cell-inner {
      padding-left: 42px;
    }
  }
}

.left {
  text-align: left;
  justify-content: flex-start;
}
.right {
  text-align: right;
  flex-direction: row-reverse;
}
.center {
  text-align: center;
  justify-content: center;
}

.custom-padding {
  padding: 5px 20px;
}

.market-crypto-table {
  .table-inner {
    padding: 0 4px 4px;
  }
  .table__header {
    position: sticky;
    z-index: 1;
    left: 0;
    top: 0;
    background: $white;
    box-shadow: 0 1px 0 0 rgba(70, 127, 237, 0.1);
  }
  .table__cell:first-child {
    border-top-color: rgba(70, 127, 237, 0.1);
    position: static;
  }
}
</style>
