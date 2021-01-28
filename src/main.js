import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from "vuelidate";
import Axios from 'axios';
import moment from 'moment';
/** import scss files */
import '@/assets/styles/main.scss'
import '@/assets/styles/mobile.scss'


// authentication
Vue.prototype.$http = Axios;
const accessToken = localStorage.getItem('access_token');

if (accessToken) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = accessToken
}

// end of authentication


// filtering
/** date formatting  */
Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(value).format('MMM Do YYYY')
    }
})


/** end of scss files */
Vue.use(Vuelidate);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app')