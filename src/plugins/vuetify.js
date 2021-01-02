import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#119F4A', //dark green
                secondary: '#20DB6B', // light green
                accent: '#EDFFF4', // lighter green
            },
        },
    },
})