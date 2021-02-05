// import _ from "lodash";
import ActionsService from "@/services/actions.service";

export const group = {
  namespaced: true,
  state: {
    basicDetails: {},
    gData: {
      loaded: false,
    },
  },
  mutations: {
    keepGroupInfo(state, payload) {
      // get the basic informations for group
      let details = {
        created: payload.data.start_date,
        diocese: payload.data.diocese.name,
        paroisse: payload.data.paroisse.name,
        membres: {
          girls: payload.data.initial_girls_number,
          boys: payload.data.initial_boys_number,
        },
      };

      state.basicDetails = details;
    },
  },

  actions: {
    // single paroisse Fetching
    getGroupInfo({ commit }, groupId) {
      return ActionsService.getSgroup(groupId).then((response) => {
        if (response.statusText === "OK") {
          commit("keepGroupInfo", response.data);
        } else {
          console.log("some error occured");
        }
      });
    },
  },
};
