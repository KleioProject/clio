import Vue from 'vue';
import gql from 'graphql-tag';

export default {
    state: {
        showMessage: false,
        messageBody: ''
    },
    getters: {
        showMessage( state ) {
            return state.showMessage;
        },
        messageBody( state ) {
            return state.messageBody;
        }
    },
    mutations: {
        setShowMessage( state, showMessage ) {
            state.showMessage = showMessage;
        },
        setMessageBody( state, messageBody ) {
            state.messageBody = messageBody;
        }
    },
    actions: {
        setShowMessage( { commit }, showMessage ) {
            commit( 'setShowMessage', showMessage );
        },
        setMessageBody( { commit }, messageBody ) {
            commit( 'setMessageBody', messageBody );
        }
    }
};
