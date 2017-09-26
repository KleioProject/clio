import Vue from 'vue';
import gql from 'graphql-tag';

export default () => {
    return {
        state: {
            popupBody: 'Popup Headline',
            popupCancel: null,
            popupHeadline: 'Popup body text goes here',
            popupProceed: null,
            popupProceedLabel: 'Proceed',
            showPopup: false
        },
        getters: {
            popupBody( state ) {
                return state.popupBody;
            },
            popupCancel( state ) {
                return state.popupCancel;
            },
            popupHeadline( state ) {
                return state.popupHeadline;
            },
            popupProceed( state ) {
                return state.popupProceed;
            },
            popupProceedLabel( state ) {
                return state.popupProceedLabel;
            },
            showPopup( state ) {
                return state.showPopup;
            }
        },
        mutations: {
            setPopupBody( state, popupBody ) {
                state.popupBody = popupBody;
            },
            setPopupCancel( state, popupCancel ) {
                state.popupCancel = popupCancel;
            },
            setPopupHeadline( state, popupHeadline ) {
                state.popupHeadline = popupHeadline;
            },
            setPopupProceed( state, popupProceed ) {
                state.popupProceed = popupProceed;
            },
            setPopupProceedLabel( state, popupProceedLabel ) {
                state.popupProceedLabel = popupProceedLabel;
            },
            setShowPopup( state, showPopup ) {
                state.showPopup = showPopup;
            }
        },
        actions: {
            setPopupBody( { commit }, popupBody ) {
                commit( 'setPopupBody', popupBody );
            },
            setPopupCancel( { commit }, popupCancel ) {
                commit( 'setPopupCancel', popupCancel );
            },
            setPopupHeadline( { commit }, popupHeadline ) {
                commit( 'setPopupHeadline', popupHeadline );
            },
            setPopupProceed( { commit }, popupProceed ) {
                console.log( popupProceed );
                commit( 'setPopupProceed', popupProceed );
            },
            setPopupProceedLabel( { commit }, popupProceedLabel ) {
                commit( 'setPopupProceedLabel', popupProceedLabel );
            },
            setShowPopup( { commit }, showPopup ) {
                commit( 'setShowPopup', showPopup );
            }
        }
    };
};
