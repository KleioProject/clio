export default () => {
    return {
        setEmail( state, email ) {
            state.email = email;
        },
        setFaculties( state, faculties ) {
            state.faculties = faculties;
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
    };
};

