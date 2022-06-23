<template>
  <div
    :class="{ open: DDShow }"
    class="dropdown"
    v-click-outside="onClickOutside"
  >
    <div @click="DDShow = !DDShow" class="dropdown-selected">
      <p>{{ selectedItem }}</p>
      <span class="arr" />
    </div>
    <transition name="slide-fade">
      <div v-show="DDShow" class="dropdown-list">
        <ul>
          <li
            v-for="(item, idx) in CURRENCIES"
            :key="idx + item"
            @click="itemClicked(item)"
          >
            <button class="btn">{{ item }}</button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useCurrencyQuote } from "@/composables/useCurrencyQuote";
import vClickOutside from "click-outside-vue3/dist/v-click-outside.umd";
import { useStore } from "vuex";

export default defineComponent({
  name: "Dropdown",
  components: {},
  directives: {
    clickOutside: vClickOutside.directive,
  },
  setup: function () {
    const store = useStore();
    const selectedItem = ref("");
    const DDShow = ref(false);
    const { currencyQuote, CURRENCIES } = useCurrencyQuote();

    const itemClicked = (item) => {
      DDShow.value = !DDShow.value;
      selectedItem.value = item;
      currencyQuote.value = item;
      store.commit("balance/setCurrentCurrency", item);
      store.dispatch("balance/getBalanceStore").catch((error) => {
        store.dispatch("alerts/add", { text: error.message });
        return error;
      });
    };

    const onClickOutside = () => {
      DDShow.value = false;
    };

    onMounted(() => {
      selectedItem.value = currencyQuote.value;
      store.commit("balance/setCurrentCurrency", currencyQuote.value);
      if (store.getters["user/isLogin"]) {
        store.dispatch("balance/getBalanceStore").catch((error) => {
          store.dispatch("alerts/add", { text: error.message });
          return error;
        });
      }
    });

    return {
      DDShow,
      itemClicked,
      selectedItem,
      onClickOutside,
      CURRENCIES,
      currencyQuote,
    };
  },
});
</script>
