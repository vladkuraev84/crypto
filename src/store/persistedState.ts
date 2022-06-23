export default {
  namespaced: true,
  state: {
    cashOut: {
      step1: {
        amount: 0,
        flag: true,
      },
      step2: {
        phone: "",
        flag: false,
      },
      step3: {
        atm: "",
        flag: false,
      },
    },
  },
  getters: {
    getStep1: (state) => state.cashOut.step1,
  },
  mutations: {
    setStep1(state, { amount: amount, flag: flag }) {
      console.log({ amount: amount });
      state.cashOut.step1 = { amount: amount, flag: flag };
    },
    setStep2(state, { phone }) {
      state.cashOut.step2.phone = phone;
    },
  },
  actions: {},
};
