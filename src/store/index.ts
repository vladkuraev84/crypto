import { createStore } from "vuex";
import alerts from "@/store/alerts";
import user from "@/store/user";
import balance from "@/store/balance";
import persistedState from "@/store/persistedState";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls: any = new SecureLS({
  encodingType: "DES",
  encryptionSecret: "$FakeName2022$",
  isCompression: false,
});

const store = createStore({
  modules: { alerts, user, persistedState, balance },
  plugins: [
    createPersistedState({
      paths: ["persistedState", "balance"],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  strict: process.env.NODE_ENV !== "production",
});

export default store;
