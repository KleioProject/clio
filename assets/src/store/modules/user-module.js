import Vue from 'vue';
import gql from 'graphql-tag';

import * as USER_QUERY from '../../graphql/user.graphql';
import * as FACULTIES_QUERY from '../../graphql/faculties.graphql';

export default {
    state: {
        user: null,
        email: '',
        password: '',
        faculties: []
    },
    getters: {
        user( state ) {
            return state.user;
        },
        email( state ) {
            return state.email;
        },
        password( state ) {
            return state.password;
        },
        faculties( state ) {
            return state.faculties;
        }
    },
    mutations: {
        setUser( state, user ) {
            state.user = user;
        },
        setEmail( state, email ) {
            state.email = email;
        },
        setPassword( state, password ) {
            state.password = password;
        },
        setFaculties( state, faculties ) {
            state.faculties = faculties;
        }
    },
    actions: {
        fetchUser( { commit }, payload ) {
            return new Promise( function ( resolve, reject ) {
                Vue.apollo.query( {
                    query: gql`${ USER_QUERY }`,
                    variables: { id: 3 }
                } ).then( ( result ) => {
                    console.log( result.data.customer );
                    commit( 'setUser', result.data.customer );
                    resolve();
                } ).catch( ( error ) => {
                    console.dir( error );
                    commit( 'setUser', null );
                    payload.router.push( '/search' );
                    reject();
                } );
            } )

        },
        fetchFaculties( { commit }, payload ) {
            return new Promise( function ( resolve, reject ) {
                Vue.apollo.query( {
                    query: gql`${ FACULTIES_QUERY }`,
                } ).then( ( result ) => {
                    console.log( result.data.faculties );
                    commit( 'setFaculties', result.data.faculties );
                    resolve();
                } ).catch( ( error ) => {
                    console.dir( error );
                    reject();
                } );
            } )

        },
        setEmail( { commit }, email ) {
            commit( 'setEmail', email );
        },
        setPassword( { commit }, password ) {
            commit( 'setPassword', password );
        },
        login( { commit }, payload ) {
            Vue.axios.post( 'http://localhost:4000/account/login', payload.loginData )
                .then( function ( response ) {
                    console.log( response );
                    commit( 'setUser', response );
                } )
                .catch( function ( error ) {
                    console.log( typeof error );
                    commit( 'setUser', null );
                } );
        }
    }
};
