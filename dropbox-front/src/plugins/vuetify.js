import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: '#9c27b0',
                secondary: '#673ab7',
                accent: '#3f51b5',
                error: '#f44336',
                warning: '#ff9800',
                info: '#2196f3',
                success: '#4caf50'
            }
        },
    },
});
