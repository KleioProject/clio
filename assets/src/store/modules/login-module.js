import Vue from 'vue';

export default () => {
    return {
        state: {
            email: 'user@uni-sofia.bg',
            password: 'useruser',
            token: '',
            user: null
        },
        getters: {
            email( state ) {
                return state.email;
            },
            password( state ) {
                return state.password;
            },
            token( state ) {
                return state.token;
            },
            user( state ) {
                return state.user;
            }
        },
        mutations: {
            setEmail( state, email ) {
                state.email = email;
            },
            setPassword( state, password ) {
                state.password = password;
            },
            setToken( state, token ) {
                state.token = token;
            },
            setUser( state, user ) {
                state.user = user;
            }
        },
        actions: {
            login( { commit }, payload ) {
                Vue.axios.post( `${ process.env.API_URL }account/login`, payload )
                    .then( function ( response ) {
                        commit( 'setUser', response.data );
                    } )
                    .catch( function ( error ) {
                        commit( 'setUser', null );
                    } );
            },
            setEmail( { commit }, email ) {
                commit( 'setEmail', email );
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
        }
    };
};


