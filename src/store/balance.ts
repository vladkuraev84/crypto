import * as authApi from "@/api/auth.ts";

export default {
  namespaced: true,
  state: {
    balance: 0,
    assets: [],
    currentCurrency: "",
  },
  getters: {
    getBalance: (state) => {
      let am = 0;
      if (state.currentCurrency == "USD") {
        for (const i in state.assets) {
          if (state.assets[i].asset == "USD") {
            am += Number(state.assets[i].amount.toFixed(2));
          } else if (state.assets[i].asset == "EUR") {
            am += Number((state.assets[i].amount * 1.05).toFixed(2));
          } else if (state.assets[i].asset == "NOK") {
            am += Number((state.assets[i].amount * 0.1).toFixed(2));
          } else if (state.assets[i].asset == "JPY") {
            am += Number((state.assets[i].amount * 0.0074).toFixed(2));
          } else if (state.assets[i].asset == "AUD") {
            am += Number((state.assets[i].amount * 0.69).toFixed(2));
          } else if (state.assets[i].asset == "CHF") {
            am += Number((state.assets[i].amount * 1.01).toFixed(2));
          }
        }
      }
      if (state.currentCurrency == "EUR") {
        for (const i in state.assets) {
          if (state.assets[i].asset == "USD") {
            am += Number((state.assets[i].amount * 0.95).toFixed(2));
          } else if (state.assets[i].asset == "EUR") {
            am += Number(state.assets[i].amount.toFixed(2));
          } else if (state.assets[i].asset == "NOK") {
            am += Number((state.assets[i].amount * 0.096).toFixed(2));
          } else if (state.assets[i].asset == "JPY") {
            am += Number((state.assets[i].amount * 0.007).toFixed(2));
          } else if (state.assets[i].asset == "AUD") {
            am += Number((state.assets[i].amount * 0.66).toFixed(2));
          } else if (state.assets[i].asset == "CHF") {
            am += Number((state.assets[i].amount * 0.98).toFixed(2));
          }
        }
      }
      if (state.currentCurrency == "NOK") {
        for (const i in state.assets) {
          if (state.assets[i].asset == "USD") {
            am += Number((state.assets[i].amount * 9.9).toFixed(2));
          } else if (state.assets[i].asset == "EUR") {
            am += Number((state.assets[i].amount * 10.41).toFixed(2));
          } else if (state.assets[i].asset == "NOK") {
            am += Number(state.assets[i].amount.toFixed(2));
          } else if (state.assets[i].asset == "JPY") {
            am += Number((state.assets[i].amount * 0.073).toFixed(2));
          } else if (state.assets[i].asset == "AUD") {
            am += Number((state.assets[i].amount * 6.9).toFixed(2));
          } else if (state.assets[i].asset == "CHF") {
            am += Number((state.assets[i].amount * 10.24).toFixed(2));
          }
        }
      }
      if (state.currentCurrency == "JPY") {
        for (const i in state.assets) {
          if (state.assets[i].asset == "USD") {
            am += Number((state.assets[i].amount * 135.08).toFixed(2));
          } else if (state.assets[i].asset == "EUR") {
            am += Number((state.assets[i].amount * 142.12).toFixed(2));
          } else if (state.assets[i].asset == "NOK") {
            am += Number((state.assets[i].amount * 13.64).toFixed(2));
          } else if (state.assets[i].asset == "JPY") {
            am += Number(state.assets[i].amount.toFixed(2));
          } else if (state.assets[i].asset == "AUD") {
            am += Number((state.assets[i].amount * 94.17).toFixed(2));
          } else if (state.assets[i].asset == "CHF") {
            am += Number((state.assets[i].amount * 139.68).toFixed(2));
          }
        }
      }
      if (state.currentCurrency == "AUD") {
        for (const i in state.assets) {
          if (state.assets[i].asset == "USD") {
            am += Number((state.assets[i].amount * 1.43).toFixed(2));
          } else if (state.assets[i].asset == "EUR") {
            am += Number((state.assets[i].amount * 1.51).toFixed(2));
          } else if (state.assets[i].asset == "NOK") {
            am += Number((state.assets[i].amount * 0.15).toFixed(2));
          } else if (state.assets[i].asset == "JPY") {
            am += Number((state.assets[i].amount * 0.011).toFixed(2));
          } else if (state.assets[i].asset == "AUD") {
            am += Number(state.assets[i].amount.toFixed(2));
          } else if (state.assets[i].asset == "CHF") {
            am += Number((state.assets[i].amount * 1.48).toFixed(2));
          }
        }
      }
      if (state.currentCurrency == "CHF") {
        for (const i in state.assets) {
          if (state.assets[i].asset == "USD") {
            am += Number((state.assets[i].amount * 0.97).toFixed(2));
          } else if (state.assets[i].asset == "EUR") {
            am += Number((state.assets[i].amount * 1.02).toFixed(2));
          } else if (state.assets[i].asset == "NOK") {
            am += Number((state.assets[i].amount * 0.098).toFixed(2));
          } else if (state.assets[i].asset == "JPY") {
            am += Number((state.assets[i].amount * 0.0072).toFixed(2));
          } else if (state.assets[i].asset == "AUD") {
            am += Number((state.assets[i].amount * 0.67).toFixed(2));
          } else if (state.assets[i].asset == "CHF") {
            am += Number(state.assets[i].amount.toFixed(2));
          }
        }
      }
      return am;
    },
    getAssets: (state) => state.assets,
    getCurrentCurrency: (state) => state.currentCurrency,
  },
  mutations: {
    setAssets(state, assets) {
      state.assets = assets;
    },
    setCurrentCurrency(state, currentCurrency) {
      state.currentCurrency = currentCurrency;
    },
  },
  actions: {
    async getBalanceStore({ commit }) {
      const { data } = await authApi.getBalance();
      commit("setAssets", data.assets);
      // const userInfo = data ? jwtDecode(data) : undefined;
      // store.commit("user/setUser", userInfo);
      // localStorage.setItem("token", data);
      return data;
    },

    async getVoucher({ commit }, { voucher }) {
      const { data } = await authApi.postVoucher({
        voucher,
      });
      if (data) {
        return true;
      }
    },
  },
};
