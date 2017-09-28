import Vue from 'vue';
import gql from 'graphql-tag';

import * as FACULTIES_QUERY from '../graphql/faculties.graphql';

export default () => {
    return {
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
                    reject();
                } );
            } );
        },
        setFaculties( { commit }, payload ) {
            commit( 'setFaculties', payload );
        }
    };
};

