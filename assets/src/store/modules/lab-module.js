import Vue from 'vue';
import gql from 'graphql-tag';

import * as LAB_AC_QUERY from '../../graphql/labAcQuery.graphql';

export default () => {
    return {
        state: {
            acResults: [],
            acSelected: null,
            ckOne: 'CK One',
            ckTwo: 'CK Two',
            dropFiles: [],
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
            }
        }
    };
};


