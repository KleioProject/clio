import Vue from 'vue';
import gql from 'graphql-tag';

export default () => {
    return {
        state: {
            isSuccess: true,
            messageBody: '',
            messages: [],
            messageTimeout: 5000,
            showMessage: false
        },
        getters: {
            isSuccess( state ) {
                return state.isSuccess;
            },
            messageBody( state ) {
                return state.messageBody;
            },
            messages( state ) {
                return state.messages;
            },
            messageTimeout( state ) {
                return state.messageTimeout;
            },
            showMessage( state ) {
                return state.showMessage;
            }
        },
        mutations: {
            addMessage( state, newMessage ) {
                state.messages.push( newMessage );
            },
            removeMessage( state, index ) {
                state.messages.splice( index, 1 );
            },
            setIsSuccess( state, isSuccess ) {
                state.isSuccess = isSuccess;
            },
            setMessageBody( state, messageBody ) {
                state.messageBody = messageBody;
            },
            setMessageTimeout( state, timeout ) {
                state.messageTimeout = timeout;
            },
            setShowMessage( state, showMessage ) {
                state.showMessage = showMessage;
            }
        },
        actions: {
            addMessage( { commit }, newMessage ) {
                commit( 'addMessage', newMessage );
            },
            removeMessage( { commit }, index ) {
                commit( 'removeMessage', index );
            },
            setIsSuccess( { commit }, isSuccess ) {
                commit( 'setIsSuccess', isSuccess );
            },
            setMessageBody( { commit }, messageBody ) {
                commit( 'setMessageBody', messageBody );
            },
            setMessageTimeout( { commit }, timeout ) {
                commit( 'setMessageTimeout', timeout );
            },
            setShowMessage( { commit }, showMessage ) {
                commit( 'setShowMessage', showMessage );
            }
        }
    };
};
