import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        logo: require('@/assets/logo.png'),
        sidelogo: require('@/assets/sidelogo.png'),
        drawer: true,
        userName: "Niyongabo",
        userRole: "Data Collector"
    },
    mutations: {
        drawer(state) {
            state.drawer = !state.drawer
        },
    },
    actions: {},
    modules: {},
})