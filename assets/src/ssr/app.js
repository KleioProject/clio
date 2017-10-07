import Vue from "vue";
import VueRouter from "vue-router";
import { sync } from 'vuex-router-sync';
import Vuebar from 'vuebar';

import './../../styles/main.scss';
import './../common/filters';
import './../common/directives';
import createRouter from './../router';
import createStore from './../store/store';
import createApolloClient from '../graphql/apollo';
import createAxiosClient from '../http/axios';
import createValidator from '../validator/validator';
import App from "./../App";

Vue.config.productionTip = false;

export function createApp() {
    console.log( 'App created isBrowser: ', isBrowser );
    const store = createStore();
    const router = createRouter( store );
    const client = createApolloClient( store, router );
    const axios = createAxiosClient( store, router );
    const validator = createValidator();

    const ApolloPlugin = {
        install( Vue, options ) {
            Vue.apollo = client;
        }
    };
    const AxiosPlugin = {
        install( Vue, options ) {
            Vue.axios = axios;
        }
    };

    Vue.use( ApolloPlugin );
    Vue.use( AxiosPlugin );
    Vue.use( validator );
    Vue.use(Vuebar);

    // In order to have it in the router.beforeEach on the Browser!
    if ( isBrowser && window.__INITIAL_STATE__ ) {
        store.replaceState( window.__INITIAL_STATE__ );
    }
    sync( store, router );

    const app = new Vue( {
        router,
        store,
        render: h => h( App )
    } );
    return { app, router, store, client, axios };
};

