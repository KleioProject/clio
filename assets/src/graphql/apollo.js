import ApolloClient, { createNetworkInterface } from 'apollo-client';

function createApolloClient( store ) {
    const networkInterface = createNetworkInterface( {
        uri: 'http://localhost:4000/gql',
        opts: {
            credentials: 'same-origin',
        }
    } );

    // TODO: handle errors here (showm messages etc)
    networkInterface.useAfter( [ {
        applyAfterware( { response }, next ) {
            console.log( 'Apollo useAfter' );
            next();
        }
    }] );


    const client = new ApolloClient( {
        networkInterface: networkInterface,
        dataIdFromObject: o => o.id
    } );

    return client;
};

export default createApolloClient;
