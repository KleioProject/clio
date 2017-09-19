import Vue from 'vue';
import Vuex from 'vuex';

import createState from './state';
import createGetters from './getters';
import createMutations from './mutations';
import createActions from './actions';
import createLoginModule from './modules/login-module';
import createMessageModule from './modules/message-module';
import createTestModule from './modules/test-module';

Vue.use( Vuex );

function createStore() {
    return new Vuex.Store( {
        state: createState(),
        getters: createGetters(),
        mutations: createMutations(),
        actions: createActions(),
        modules: {
            loginModule: createLoginModule(),
            messageModule: createMessageModule(),
            testModule: createTestModule()
        }
    } );
};

export default createStore;
