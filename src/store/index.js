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
    deleteDiocese(id) {
      console.log("function called and give" + id);
    },
  },
  modules: {
    auth,
  },
});
