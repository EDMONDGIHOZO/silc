import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from "vuelidate";

/** import scss files */
import '@/assets/styles/main.scss'
import '@/assets/styles/mobile.scss'
/** end of scss files */
Vue.use(Vuelidate);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app')