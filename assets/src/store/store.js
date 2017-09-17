import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import userModule from './modules/user-module';
import messagesModule from './modules/messages-module';

Vue.use( Vuex );

function createStore() {
    return new Vuex.Store( {
        state,
        getters,
        mutations,
        actions,
        modules: {
            userModule,
            messagesModule
        }
    } );
};

export default createStore;
