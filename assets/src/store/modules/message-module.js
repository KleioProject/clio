import Vue from 'vue';
import gql from 'graphql-tag';

export default () => {
    return {
        state: {
            isSuccess: true,
            messageBody: '',
            showMessage: false
        },
        getters: {
            isSuccess( state ) {
                return state.isSuccess;
            },
            messageBody( state ) {
                return state.messageBody;
            },
            showMessage( state ) {
                return state.showMessage;
            }
        },
        mutations: {
            setIsSuccess( state, isSuccess ) {
                state.isSuccess = isSuccess;
            },
            setMessageBody( state, messageBody ) {
                state.messageBody = messageBody;
            },
            setShowMessage( state, showMessage ) {
                state.showMessage = showMessage;
            }
        },
        actions: {
            setIsSuccess( { commit }, isSuccess ) {
                commit( 'setIsSuccess', isSuccess );
            },
            setMessageBody( { commit }, messageBody ) {
                commit( 'setMessageBody', messageBody );
            },
            setShowMessage( { commit }, showMessage ) {
                commit( 'setShowMessage', showMessage );
            }
        }
    };
};
