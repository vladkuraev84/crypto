import * as authApi from "@/api/auth.ts";
// import jwtDecode from "jwt-decode";
// import store from "@/store/index";

export default {
  namespaced: true,
  state: {
    user: null,
    verificationDetail: {},
    voucherFlag: true,
  },
  getters: {
    isLogin: (state) => state.user !== null,
    dataUser: (state) => state.user,
    nameIdentifier: (state) => state.user.NameIdentifier,
    verificationDetail: (state) => state.verificationDetail,
    getVoucherFlag: (state) => state.voucherFlag,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setVerificationDetailUser(state, verificationDetail) {
      state.verificationDetail = verificationDetail;
    },
    setVoucherFlag(state, voucherFlag) {
      state.voucherFlag = voucherFlag;
    },
  },
  actions: {
    async login({ commit }, { email, phone, password }) {
      const { data } = await authApi.login({
        email,
        phone,
        password,
      });
      return data;
    },

    async registration({ commit }, { email, phone, password }) {
      const { data } = await authApi.registration({
        email,
        phone,
        password,
      });
      return data;
    },

    async getUserStore({ commit }) {
      const { data } = await authApi.getUser();
      commit("setVerificationDetailUser", data);
      // const userInfo = data ? jwtDecode(data) : undefined;
      // store.commit("user/setUser", userInfo);
      // localStorage.setItem("token", data);
      return data;
    },

    async verifyLogRegStore({ commit }, { verifyType, userId, otpCode }) {
      const { data } = await authApi.verifyLogReg({
        verifyType,
        userId,
        otpCode,
      });
      return data;
    },

    async verifyReSendStore({ commit }, { userId }) {
      const { data } = await authApi.verifyReSend({
        userId,
      });
      return data;
    },

    async sumsubTestCompleteStore(store, { applicantId, externalUserId }) {
      const { data } = await authApi.sumsubTestComplete({
        applicantId,
        externalUserId,
      });
      return data;
    },
  },
};
