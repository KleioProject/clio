import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import searchModule from './modules/search-module';
import userModule from './modules/user-module';

Vue.use( Vuex );

function createStore() {
    return new Vuex.Store( {
        state,
        getters,
        mutations,
        actions,
        modules: {
            searchModule,
            userModule
        }
    } );
};

export default createStore;