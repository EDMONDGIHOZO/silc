import Vue from 'vue'
import Vuex from 'vuex'
import ActionsService from '@/services/actions.service'
import { auth } from './auth.module'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        logo: require('@/assets/logo.png'),
        sidelogo: require('@/assets/sidelogo.png'),
        drawer: true,
        UserInfo: [],
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

        saveUserInfo(state, payload) {
            state.UserInfo = payload
        },
    },
    actions: {
        getUserInfo({ commit }) {
            return ActionsService.getUserInfo().then(
                (response) => {
                    commit('saveUserInfo', response.data.data)
                },
                (error) => {
                    return Promise.reject(error)
                },
            )
        },
    },
    modules: {
        auth,
    },
})