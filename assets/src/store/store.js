import Vue from 'vue';
import Vuex from 'vuex';

import createState from './state';
import createGetters from './getters';
import createMutations from './mutations';
import createActions from './actions';
import createLabModule from './modules/lab-module';
import createLoginModule from './modules/login-module';
import createMessageModule from './modules/message-module';
import createPopupModule from './modules/popup-module';
import createRegisterModule from './modules/register-module';

Vue.use( Vuex );

function createStore() {
    return new Vuex.Store( {
        state: createState(),
        getters: createGetters(),
        mutations: createMutations(),
        actions: createActions(),
        modules: {
            labModule: createLabModule(),
            loginModule: createLoginModule(),
            messageModule: createMessageModule(),
            popupModule: createPopupModule(),
            registerModule: createRegisterModule()
        }
    } );
};

export default createStore;
