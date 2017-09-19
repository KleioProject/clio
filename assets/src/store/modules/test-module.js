import Vue from 'vue';
import gql from 'graphql-tag';

import * as FACULTIES_QUERY from '../../graphql/faculties.graphql';

export default () => {
    return {
        state: {
            faculties: []
        },
        getters: {
            faculties( state ) {
                return state.faculties;
            }
        },
        mutations: {
            setFaculties( state, faculties ) {
                state.faculties = faculties;
            }
        },
        actions: {
            fetchFaculties( { commit }, payload ) {
                // return promise in order to wait for resolve before proceed in router.onReady and router.beforeResolve
                return new Promise( function ( resolve, reject ) {
                    Vue.apollo.query( {
                        query: gql`${ FACULTIES_QUERY }`,
                        fetchPolicy: 'network-only'
                    } ).then( ( result ) => {
                        commit( 'setFaculties', result.data.faculties );
                        resolve();
                    } ).catch( ( error ) => {
                        console.dir( error );
                        // TODO: centralize the apollo errors in interceptor
                       /*  commit( 'setMessageBody', error.message );
                        commit( 'setShowMessage', true );
                        if ( isBrowser ) {
                            setTimeout( () => {
                                commit( 'setMessageBody', '' );
                                commit( 'setShowMessage', false );
                            }, 5000 );
                        } */

                        reject();
                    } );
                } );
            },
            setFaculties( { commit }, payload ) {
                commit( 'setFaculties', payload );
            }
        }
    };
};


