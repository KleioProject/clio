import Vue from "vue";
import VueRouter from "vue-router";
//import axios from 'axios';
//import VueAxios from 'vue-axios';
import { sync } from 'vuex-router-sync';

import './../../styles/main.scss';
import './../common/filters';
import createRouter from './../router';
import createStore from './../store/store';
import createApolloClient from '../graphql/apollo';
import createAxiosClient from '../http/axios';
import App from "./../App";

if ( process.env.ENV === 'production' ) {
    Vue.config.productionTip = false;
}

export function createApp() {
    const store = createStore();
    const router = createRouter( store );
    const client = createApolloClient( store );
    const ApolloPlugin = {
        install( Vue, options ) {
            Vue.apollo = client;
        }
    };
    const axios = createAxiosClient( store );
    const AxiosPlugin = {
        install( Vue, options ) {
            Vue.axios = axios;
        }
    };

    Vue.use( ApolloPlugin );
    Vue.use( AxiosPlugin );

    sync( store, router );

    const app = new Vue( {
        router,
        store,
        render: h => h( App )
    } );
    return { app, router, store, client, axios };
};

