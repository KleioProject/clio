export default {
    maturePersons( state ) {
        return state.persons.filter(( user ) => {
            return user.age > 39;
        } );
    },
    greeting( state ) {
        return state.greeting;
    },
    clicks( state ) {
        return state.clicks;
    },
    message( state ) {
        return state.message;
    },
    personId( state ) {
        return state.personId;
    },
    persons( state ) {
        return state.persons;
    },
    posts( state ) {
        return state.posts;
    }
}