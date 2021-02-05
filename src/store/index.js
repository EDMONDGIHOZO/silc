import Vue from "vue";
import Vuex from "vuex";
import ActionsService from "@/services/actions.service";
import { auth } from "./auth.module";
Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production';

let currentStep = localStorage.getItem("step");
if (!currentStep) {
  currentStep = 1;
}
// let currentStep = 1;
// if (colid) {
//   currentStep = 2;
// } else {
//   currentStep = 1;
// }
export default new Vuex.Store({
  state: {
    logo: require("@/assets/logo.png"),
    sidelogo: require("@/assets/sidelogo.png"),
    drawer: true,
    UserInfo: [],
    avatarChar: "N",
    steps: currentStep,

    // dioceseses
    diocese: {
      loaded: false,
      status: "",
      data: [],
    },

    singleDiocese: {
      loaded: false,
      status: "",
      data: [],
    },

    // alert views
    alert: {
      message: "it works fine like this",
      status: false,
      color: "success",
    },

    // single paroisse data
    resumes: [],
    series: [],
    relations: {},
    parGroups: [],
    parAbandons: {},
    inscription: {},
    pData: {
      loaded: false,
      name: "",
    },
  },
  mutations: {
    drawer(state) {
      state.drawer = !state.drawer;
    },

    closeAlert(state) {
      state.alert.status = false;
    },

    alerter(state, payload) {
      // change the alert message and colors
      if (payload.status === "success") {
        state.alert.message = payload.message;
        state.alert.status = true;
        state.alert.color = payload.status;
      }
    },

    updateSteps(state, steps) {
      state.steps = steps;
    },
    endSteps(state) {
      state.steps = 1;
    },

    keepDioceses(state, payload) {
      state.diocese.data = payload.data;
      state.diocese.loaded = true;
    },
    keepDiocese(state, payload) {
      state.singleDiocese.data = payload.data;
      state.singleDiocese.loaded = true;
      state.singleDiocese.empty = false;
    },

    keepPar(state, payload) {
      let resumes = [];
      // calculate total credited members
      let collections = payload.data.collections;
      let groupes = payload.data.groups;

      const total_girls = collections.reduce(
        (a, b) => +a + +b.membres_actuel_inscrits_girls,
        0
      );
      const total_boys = collections.reduce(
        (a, b) => +a + +b.membres_actuel_inscrits_boys,
        0
      );

      const totalMembers = total_girls + total_boys;

      // inscription

      const inscrits = {
        boysInscrits: total_boys,
        girlsInscrit: total_girls,
        boysInscritsPercent: percentage(total_boys, totalMembers),
        girlsInscritsPercent: percentage(total_girls, totalMembers),
        totalMembers: totalMembers,
      };

      const total_amount_epargne = collections.reduce(
        (a, b) => +a + +b.epargne.valeur_total_epargne_realise_mois,
        0
      );

      const total_girls_credite = collections.reduce(
        (a, b) => +a + +b.credit.membres_contracte_un_credit_girls,
        0
      );

      const total_boys_credite = collections.reduce(
        (a, b) => +a + +b.credit.membres_contracte_un_credit_boys,
        0
      );

      const total_credited_members = total_boys_credite + total_girls_credite;

      // abandoning

      const abandonedGirls = collections.reduce(
        (a, b) => +a + +b.abandons_mois_actuel_gils,
        0
      );
      const abandonedBoys = collections.reduce(
        (a, b) => +a + +b.abandons_mois_actuel_boys,
        0
      );

      const total_abandoners = abandonedBoys + abandonedGirls;
      // percentage calculator function
      function percentage(partialValue, totalValue) {
        let result = (100 * partialValue) / totalValue;
        return result.toFixed(0);
      }

      const girlsPercentage = percentage(abandonedGirls, total_abandoners);
      const boysPercentage = percentage(abandonedBoys, total_abandoners);

      const parAbandons = {
        abandoned_girls: abandonedGirls,
        abandoned_boys: abandonedBoys,
        girls_percentage: girlsPercentage,
        boys_percentage: boysPercentage,
        total_abandoners: total_abandoners,
      };

      // attendency
      let series = [];
      const boysAttended = collections.reduce(
        (a, b) => +a + +b.membres_present_en_reunion_boys,
        0
      );

      series.push(boysAttended);

      const girlsAttended = collections.reduce(
        (a, b) => +a + +b.membres_present_en_reunion_girls,
        0
      );
      series.push(girlsAttended);

      // external relations

      let relations = {
        membres: 0,
        groupes: 0,
      };
      const members_opened_account = collections.reduce(
        (a, b) => +a + +b.relation.membres_ouvert_compte_bancaire,
        0
      );

      const groupes_opened_account = collections.reduce(
        (a, b) => +a + +b.relation.ouvert_compte_bancaire,
        0
      );

      relations.membres = members_opened_account;
      relations.groupes = groupes_opened_account;

      function resumeObject(title, icon, id, value) {
        this.title = title;
        this.icon = icon;
        this.id = id;
        this.value = value;
      }

      resumes.push(
        new resumeObject(
          "Nombres de groupes",
          "mdi-account-group",
          1,
          payload.data.__meta__.groups_count
        )
      );
      resumes.push(
        new resumeObject("Membres inscrit", "mdi-account-plus", 2, totalMembers)
      );

      resumes.push(
        new resumeObject(
          "epargnes",
          "mdi-source-merge",
          3,
          total_amount_epargne
        )
      );

      resumes.push(
        new resumeObject(
          "Membres contracte du credit",
          "mdi-source-merge",
          4,
          total_credited_members
        )
      );

      state.resumes = resumes;
      state.pData.name = payload.data.name;
      state.series = series;
      state.relations = relations;
      state.parGroups = groupes;
      state.parAbandons = parAbandons;
      state.inscription = inscrits;
      state.pData.loaded = true;
    },

    saveUserInfo(state, payload) {
      state.UserInfo = payload;
    },
  },
  actions: {
    getUserInfo({ commit }) {
      return ActionsService.getUserInfo().then(
        (response) => {
          commit("saveUserInfo", response.data.data);
          localStorage.setItem("userInfo", JSON.stringify(response.data.data));
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },

    getDioceses({ commit }) {
      return ActionsService.getDioceses().then((response) => {
        if (response.statusText === "OK") {
          commit("keepDioceses", response.data);
        } else {
          console.log("some error occured");
        }
      });
    },

    getDiocese({ commit }, id) {
      return ActionsService.getDiocese(id).then((response) => {
        if (response.statusText === "OK") {
          commit("keepDiocese", response.data);
        } else {
          console.log("some error occured");
        }
      });
    },

    // single paroisse Fetching
    getPar({ commit }, id) {
      return ActionsService.getPar(id).then((response) => {
        if (response.statusText === "OK") {
          commit("keepPar", response.data);
        } else {
          console.log("some error occured");
        }
      });
    },
  },
  modules: {
    auth,
  },
});
