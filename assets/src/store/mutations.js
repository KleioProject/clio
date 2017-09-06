export default {
    addUser( state, payload ) {
        state.persons.push( {
            name: `NewPerson-${ state.personId++ }`,
            age: payload.age
        } );
    },
    increment( state, payload ) {
        state.clicks += payload.amount;
    },
    changeGreeting( state, payload ) {
        state.greeting = payload.value;
    },
    changeMessage( state, payload ) {
        state.message = payload.value;
    },
    setPosts( state, response ) {
        state.posts = response.data;
    }
}