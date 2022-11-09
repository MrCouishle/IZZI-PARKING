import postData from "@/axios";
import { NEKOT } from "@/global";

export default {
  namespaced: true,
  state: {
    entry: [],
  },
  getters: {
    getEntry: (state) => (list) => state[list],
  },
  mutations: {
    _setEntryData(state, data) {
      state[data.list] = data.res;
    },
    pushEntry(state, data) {
      state[data.list].push(data.data_);
    },
    popEntry(state, data) {
      const indice = state[data.list].map((e) => e._id).indexOf(data._id);
      state[data.list].splice(indice, 1);
    },
    editEntry(state, data) {
      const indice = state[data.list].map((e) => e._id).indexOf(data._id);
      state[data.list][indice].color = data.data_.color;
      state[data.list][indice].type = data.data_.type;
      state[data.list][indice].placa = data.data_.placa;
    },
  },
  actions: {
    async _postEntry({ commit }, { data_ }) {
      try {
        console.log(data_)
        const RES = await postData({ header: { x_token: NEKOT }, method: "POST", url: `/create&entry`, data: data_ });
        if (RES?.msg?.keyPattern?.placa) return { msg: "V-001", alert: "error" };
        else if (RES?.msg) return { msg: "V-000", alert: "error" };
        else {
          commit("pushEntry", { list: "entry", data_ });
          return RES;
        }
      } catch (error) {
        console.error("_postEntry", error);
      }
    },

    async _getEntrys({ commit }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "GET", url: `get&entrys` });
        if (!RES.msg) {
          return commit("_setEntryData", {
            list: "entry",
            res: RES,
          });
        } else return { msg: "V-003", alert: "info" };
      } catch (error) {
        console.error("_getEntrys", error);
      }
    },
    async _putEntry({ commit }, { _id, data_ }) {
      try {
        const RES = await postData({
          url: `edit&entry/${_id}`,
          header: { x_token: NEKOT },
          method: "PUT",
          data: data_,
        });
        if (RES.msg) return RES.msg;
        else {
          commit("editEntry", { list: "entry", data_, _id });
          return RES;
        }
      } catch (error) {
        console.error("_putEntry", error);
      }
    },
    async _deleteEntry({ commit }, { _id }) {
      try {
        const RES = await postData({ url: `delet&entry/${_id}`, header: { x_token: NEKOT }, method: "DELETE" });
        if (RES.msg) return RES.msg;
        else {
          commit("popEntry", { list: "entry", _id });
          return RES;
        }
      } catch (error) {
        console.error("_deleteEntry", error);
      }
    },
  },
};