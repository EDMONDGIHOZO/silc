import Vue from 'vue'
import Vuex from 'vuex'


import { auth } from './auth.module'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        logo: require('@/assets/logo.png'),
        sidelogo: require('@/assets/sidelogo.png'),
        drawer: true,
        currentUser: {
            userName: 'Niyongabo Jules',
            userRole: 'Data Collector',
        },
        steps: 1,
    },
    mutations: {
        drawer(state) {
            state.drawer = !state.drawer
        },

        updateSteps(state, steps) {
            state.steps = steps
        },
        endSteps(state) {
            state.steps = 1
        },

    },
    actions: {

    },
    modules: {
        auth
    },
})