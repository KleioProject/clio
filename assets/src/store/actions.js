import Vue from 'vue';
import gql from 'graphql-tag';

import * as FACULTIES_QUERY from '../graphql/faculties.graphql';
import * as LOGIN_QUERY from '../graphql/login.graphql';
import * as REGISTER_QUERY from '../graphql/register.graphql';

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
        login( { commit }, payload ) {
            const credentials = {
                email: payload.email,
                password: payload.password,
            }
            Vue.apollo.mutate( {
                mutation: gql`${ LOGIN_QUERY }`,
                variables: credentials,
                fetchPolicy: 'network-only'
            } ).then( ( result ) => {
                if ( result.data && result.data.login ) {
                    commit( 'setUser', result.data.login );
                    payload.router.push( '/clio/profile' );
                }
            } ).catch( ( error ) => {
                console.dir( error );
                commit( 'setUser', null );
            } );
        },
        register( { commit }, payload ) {
            console.log( payload.registration );
            Vue.apollo.mutate( {
                mutation: gql`${ REGISTER_QUERY }`,
                variables: payload.registration,
                fetchPolicy: 'network-only'
            } ).then( ( result ) => {
                if ( result.data && result.data.register ) {
                    commit( 'setUser', result.data.register );
                    payload.router.push( '/clio/profile' );
                }
            } ).catch( ( error ) => {
                console.dir( error );
                commit( 'setUser', null );
            } );
        },
        setEmail( { commit }, email ) {
            commit( 'setEmail', email );
        },
        setFaculties( { commit }, payload ) {
            commit( 'setFaculties', payload );
        },
        setPassword( { commit }, password ) {
            commit( 'setPassword', password );
        },
        setToken( { commit }, token ) {
            commit( 'setToken', token );
        },
        setUser( { commit }, user ) {
            commit( 'setUser', user );
        }
    };
};

