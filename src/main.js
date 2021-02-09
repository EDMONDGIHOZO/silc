import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import Axios from "axios";
import moment from "moment";
import localization from "moment/locale/fr";
/** import scss files */
import "@/assets/styles/main.scss";
import "@/assets/styles/mobile.scss";
import numelize from "numeral";

// authentication
Vue.prototype.$http = Axios;
const accessToken = localStorage.getItem("access_token");

if (accessToken) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = accessToken;
}

// end of authentication

// filtering
/** date formatting  */
moment.updateLocale("fr", localization);
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(value).format("Do MMMM YYYY");
  }
});

Vue.filter("passedFormat", function(value) {
  if (value) {
    return moment(value).fromNow(true);
  }
});

Vue.filter("num", function(value) {
  if (value) {
    return numelize(value).format("0,0");
  }
});

/** end of scss files */
Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
