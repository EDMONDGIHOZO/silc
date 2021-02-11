import _ from "lodash";
import ActionsService from "@/services/actions.service";

export const group = {
  namespaced: true,
  state: {
    basicDetails: {},
    collections: [],
    tauxInterets: 0,

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
      const sortedCols = _.sortBy(
        payload.data.collections,
        (o) => o.collection_date
      );
      state.basicDetails = details;
      state.collections = sortedCols;
      state.tauxInterets = payload.data.monthly_interest;

      state.gData.loaded = true;
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
