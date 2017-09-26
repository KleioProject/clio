import Vue from 'vue';
import gql from 'graphql-tag';

import * as FACULTIES_QUERY from '../../graphql/faculties.graphql';
import * as LAB_AC_QUERY from '../../graphql/labAcQuery.graphql';

export default () => {
    return {
        state: {
            acResults: [],
            acSelected: null,
            ckOne: 'CK One',
            ckTwo: 'CK Two',
            dropFiles: [],
            faculties: [],
            markerDiameter: 22
        },
        getters: {
            acFilteredResults( state ) {
                if ( state.acSelected ) {
                    return state.acResults.filter( ( result ) => {
                        return result.id !== state.acSelected.id;
                    } );
                } else {
                    return state.acResults;
                }
            },
            acResults( state ) {
                return state.acResults;
            },
            acSelected( state ) {
                return state.acSelected;
            },
            ckOne( state ) {
                return state.ckOne;
            },
            ckTwo( state ) {
                return state.ckTwo;
            },
            dropFiles( state ) {
                return state.dropFiles;
            },
            faculties( state ) {
                return state.faculties;
            },
            markerDiameter( state ) {
                return state.markerDiameter;
            }
        },
        mutations: {
            setAcResults( state, acResultsd ) {
                state.acResults = acResultsd;
            },
            setAcSelected( state, acSelected ) {
                state.acSelected = acSelected;
            },
            setCkOne( state, ckOne ) {
                state.ckOne = ckOne;
            },
            setCkTwo( state, ckTwo ) {
                state.ckTwo = ckTwo;
            },
            setDropFiles( state, dropFiles ) {
                state.dropFiles = dropFiles;
            },
            setFaculties( state, faculties ) {
                state.faculties = faculties;
            }
        },
        actions: {
            doAcQuery( { commit }, searchTerm ) {
                Vue.apollo.query( {
                    query: gql`${ LAB_AC_QUERY }`,
                    variables: { searchTerm: searchTerm },
                    fetchPolicy: 'network-only'
                } ).then( ( result ) => {
                    if ( result.data && result.data.searchUsers ) {
                        const searchUsers = JSON.parse( JSON.stringify( result.data.searchUsers ) );
                        searchUsers.forEach( ( user ) => {
                            user.label = `${ user.searchName }`;
                        } );
                        commit( 'setAcResults', searchUsers );
                    }

                } ).catch( ( error ) => {
                    console.dir( error );
                } );
            },
            setAcResults( { commit }, acResults ) {
                commit( 'setAcResults', acResults );
            },
            setAcSelected( { commit }, acSelected ) {
                commit( 'setAcSelected', acSelected );
            },
            setCkOne( { commit }, ckOne ) {
                commit( 'setCkOne', ckOne );
            },
            setCkTwo( { commit }, ckTwo ) {
                commit( 'setCkTwo', ckTwo );
            },
            setDropFiles( { commit }, dropFiles ) {
                commit( 'setDropFiles', dropFiles );
            },
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


