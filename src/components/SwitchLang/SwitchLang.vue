<template>
  <select
    v-model="$i18n.locale"
    @click="setLocale($i18n.locale)"
    class="select"
  >
    <option value="en">En</option>
    <option value="pl">Pl</option>
    <option value="ua">Ua</option>
    <option value="de">De</option>
    <option value="fr">Fr</option>
    <option value="th">Th</option>
    <option value="cn">Cn</option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import i18n from "@/plugins/i18n/i18n";
import router from "@/router";
import { Trans } from "@/plugins/i18n/Translation";

export default defineComponent({
  name: "SwitchLang",
  components: {},
  setup: function () {
    const setLocale = (locale) => {
      localStorage.setItem("lang", locale);
      document.documentElement.lang = locale;

      if (i18n.global.locale.value === locale) {
        const to = router.resolve({ params: { locale } });
        return Trans.changeLocale(locale).then(() => {
          router.push(to);
        });
      }
    };
    /*watch(
      () => lang.value,
      (oldLang, newLang) => {
        if (oldLang !== newLang) {
          // let currentPathObject = router.currentRoute.value;
          localStorage.setItem("lang", JSON.stringify(lang.value));
          // i18n.global.locale.value = lang.value;
          router.push({
            // name: currentPathObject.name,
            // params: { lang: locale },
          });
          console.log("lang: ", JSON.parse(lang.value));
        }
      }
    );*/

    return { setLocale };
  },
});
</script>
