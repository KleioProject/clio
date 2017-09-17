import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios'
import VueAxios from 'vue-axios'

import './../styles/main.scss';
import './common/filters';
import createRouter from './router';
import createStore from './store/store';
import createApolloClient from '../graphql/apollo';
import App from "./App";


const store = createStore();
const router = createRouter( store );
const client = createApolloClient( store );
const ApolloPlugin = {
    install( Vue, options ) {
        Vue.apollo = client;
    }
};

Vue.use( ApolloPlugin );
Vue.use( VueAxios, axios );

if ( process.env.ENV === 'production' ) {
    Vue.config.productionTip = false;
}

new Vue( {
    el: '#app',
    router,
    store,
    render: h => h( App )
} );
