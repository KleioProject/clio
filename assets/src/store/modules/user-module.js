import gql from 'graphql-tag';

import client from '../../graphql/apollo';

export default {
    state: {
        user: null
    },
    getters: {
        user( state ) {
            return state.user;
        }
    },
    mutations: {
        setUser( state, user ) {
            if ( isBrowser ) {
                  localStorage.setItem( 'user', JSON.stringify( user ) );
            }
            state.user = user;
        }
    },
    actions: {
        fetchUser( { commit }, id ) {
            client.query( {
                query: gql`
					{
						customer(id:${id }) {
							id
							name
                            email
                            age
						}
					}
				`
            } ).then(( result ) => {
                console.log( result );
                commit( 'setUser', result.data.customer );
            } ).catch(( error ) => {
                console.error( error );
                commit( 'setUser', null );
            } );
        }
    }
}