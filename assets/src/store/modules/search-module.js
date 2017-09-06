import axios from 'axios';

const CancelToken = axios.CancelToken;
//const source = CancelToken.source();
let cancel = null;

export default {
    state: {
        searchResults: [],
        query: ''
    },
    getters: {
        searchResults( state ) {
            return state.searchResults;
        },
        query( state ) {
            return state.query;
        }
    },
    mutations: {
        setSearchResults( state, searchResults ) {
            state.searchResults = searchResults;
        },
        setQuery( state, newQuery ) {
            console.log( newQuery );
            state.query = newQuery;
        }
    },
    actions: {
        search( { commit }, url ) {
            if ( typeof cancel === 'function' ) {
                cancel();
                cancel = null;
                console.log( `Search request to ${ url } canceled!` );
            }
            axios.get( url, {
                cancelToken: new CancelToken( function executor( c ) {
                    cancel = c;
                } )
            } )
                .then(( response ) => {
                    console.log( response );
                    commit( 'setSearchResults', response.data );
                } )
                .catch(( error ) => {
                    console.log( error );
                } );
        },
        setQuery( { commit }, newQuery ) {
            commit( 'setQuery', newQuery );
        }
    }
}