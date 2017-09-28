export default () => {
    return {
        faculties( state ) {
            return state.faculties.map( ( faculty ) => {
                return {
                    __typename: faculty.__typename,
                    id: faculty.id,
                    label: faculty.label || faculty.name //TODO: get label from backend
                }
            } );
        }
    };
};
