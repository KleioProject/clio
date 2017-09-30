import Vue from "vue";
import VueRouter from "vue-router";
import { sync } from 'vuex-router-sync';

import './../../styles/main.scss';
import './../common/filters';
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
    const client = createApolloClient( store );
    const validator = createValidator( Vue );
    const ValidatorPlugin = {
        install( Vue, options ) {
            Vue.prototype.$validator = validator;
            Vue.prototype.$hasError = function ( formName, propName ) {
                return this.formErrors && this.formErrors[ formName ] && this.formErrors[ formName ][ propName ];
            };
            Vue.prototype.$getError = function ( formName, propName ) {
                return this.formErrors[ formName ][ propName ].message;
            };
        }
    };
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
    Vue.use( ValidatorPlugin );

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

