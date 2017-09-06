//https://ssr.vuejs.org/en/data.html
import axios from 'axios';

export default {
    addUser( context, payload ) { //{commit} - deconstructing context
        setTimeout(
            () => {
                context.commit( 'addUser', payload );
            },
            2000
        );
    },
    getPosts( context, url ) {
        axios.get( url )
            .then(( posts ) => {
                context.commit( 'setPosts', posts );
            } )
            .catch(( error ) => {
                console.log( error );
            } );
    }
}