import Vue from "vue";
import VueRouter from "vue-router";
import axios from 'axios';
import VueAxios from 'vue-axios';
import { sync } from 'vuex-router-sync';

Vue.use( VueAxios, axios );

if ( process.env.ENV === 'production' ) {
    Vue.config.productionTip = false;
}

import './../../styles/main.scss';
import './../filters';
import createRouter from './../router';
import createStore from './../store/store';
import App from "./../App";

const router = createRouter();
const store = createStore();

// sync so that route state is available as part of the store
sync( store, router );

export function createApp() {
    // create the app instance, injecting both the router and the store
    const app = new Vue( {
        router,
        store,
        render: h => h( App )
    } );
    // expose the app, the router and the store
    return { app, router, store };
};

