import postData from "@/axios";
import { NEKOT } from "@/global";

export default {
    namespaced: true,
    state: {
      vehicles: null,
    },
    getters: {
      getVehicles: (state) => (list) => state[list],
    },
    mutations: {
      setVehicles(state, data) {
        state[data.list] = data.res;
      },
    },
    actions: {
        async _addVehicle({ commit }, { DATA }) {
            try {
              console.log(DATA);
              const RES = await postData({ header: { x_token: NEKOT }, method: "POST", url: `create&vehiculo`, data: DATA });
              console.log(RES);
              return RES;
            } catch (error) {
              console.error("_addVehicle", error);
            }
          },
          async _getVehicle({ commit }) {
            try {
              const RES = await postData({ header: { x_token: NEKOT }, method: "GET", url: `get&vehiculos` });
              console.log(RES);
              return RES;
            } catch (error) {
              console.error("_getvehiculos", error);
            }
          },
    },
};