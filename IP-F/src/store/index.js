import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

import parking from "./modules/parking";
import sesion from "./modules/sesion";
import record from "./modules/record";
import user from "./modules/user";
import zone from "./modules/zone";

export default new Vuex.Store({
  state: {
    business: {
      name: "SEGURIDAD MOSGAL S.A.S",
      nit: "NIT 900.199.958",
    },
    loading: false,
  },
  getters: {
    stateLoading_(state) {
      return state.loading;
    },
    companyName_(state) {
      return state.business;
    },
  },
  mutations: {
    loadingState_(state) {
      state.loading = !state.loading;
    },
  },
  modules: {
    record,
    sesion,
    zone,
    user,
    parking,
  },
});
