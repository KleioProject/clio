export default () => {
    return {
        email( state ) {
            return state.email;
        },
        faculties( state ) {
            return state.faculties.map( ( faculty ) => {
                return {
                    __typename: faculty.__typename,
                    id: faculty.id,
                    label: faculty.label || faculty.name //TODO: get label from backend
                }
            } );
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
    };
};
