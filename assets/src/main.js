import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use( VueAxios, axios );

if ( process.env.ENV === 'production' ) {
    Vue.config.productionTip = false;
}

import './../styles/main.scss';
import './filters';
import createRouter from './router';
import createStore from './store/store';
import App from "./App";

const router = createRouter();
const store = createStore();

new Vue( {
    el: '#app',
    router,
    store,
    render: h => h( App )
} );
