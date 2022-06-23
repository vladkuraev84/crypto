import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "@/plugins/i18n/i18n";
import { Trans } from "@/plugins/i18n/Translation";
import jwtDecode from "jwt-decode";

const tokenProfile = localStorage.getItem("token");
const userInfo = tokenProfile ? jwtDecode(tokenProfile) : null;
store.commit("user/setUser", userInfo);

const app = createApp(App);
app.config.globalProperties.$i18nRoute = Trans.i18nRoute.bind(Trans);

app.use(i18n).use(store).use(router).mount("#app");
