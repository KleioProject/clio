import ApolloClient from 'apollo-client';
import { createNetworkInterface } from 'apollo-upload-client';

function createApolloClient( store ) {
    const networkInterface = createNetworkInterface( {
        uri: `${ process.env.API_URL }gql`,
        opts: {
            credentials: 'same-origin',
        }
    } );

    networkInterface.use( [
        {
            applyMiddleware( req, next ) {
                console.log( 'Apollo middleware.' );
                next();
            }
        }
    ] );

    networkInterface.useAfter( [
        {
            applyAfterware( { response }, next ) {
                console.log( 'Apollo useAfter' );
                if ( !response.ok ) {
                    store.dispatch( 'addMessage', {
                        headline: 'Apollo Error',
                        body: response.statusText,
                        timestamp: ( new Date() ).getTime(),
                        isSuccess: false
                    } );
                } else {
                    store.dispatch( 'addMessage', {
                        headline: 'Apollo Success',
                        body: 'Response has been received.',
                        timestamp: ( new Date() ).getTime(),
                        isSuccess: true
                    } );
                }
                next();
            }
        }
    ] );


    const client = new ApolloClient( {
        networkInterface: networkInterface,
        dataIdFromObject: o => o.id
    } );

    return client;
};

export default createApolloClient;
