interface IAlerts {
  messages: string[];
  lastAI: number;
  performance: string;
}

export default {
  namespaced: true,
  state: {
    messages: [],
    lastAI: 0,
    performance: "",
  },
  getters: {
    all: (state: IAlerts) => state.messages,
  },
  mutations: {
    add(state, { text, performance }) {
      state.messages.push({ id: ++state.lastAI, text, performance });
    },
    remove(state, { id }) {
      state.messages = state.messages.filter((msg) => msg.id !== id);
    },
  },
  actions: {
    add({ commit, state }, { text, timeout = 5000, performance = "warning" }) {
      const obj = { text, performance };
      if (typeof obj.text === "string") {
        commit("add", { text, performance });
      } else {
        const txt = Object.values(obj.text).join(", ");
        commit("add", { text: txt, performance: performance });
      }
      const { lastAI } = state;

      setTimeout(() => {
        commit("remove", { id: lastAI });
      }, timeout);
    },
  },
};
