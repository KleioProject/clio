import ApolloClient, { createNetworkInterface } from 'apollo-client';

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

    // TODO: handle errors here (showm messages etc)
    networkInterface.useAfter( [
        {
            applyAfterware( { response }, next ) {
                console.log( 'Apollo useAfter' );
                console.log( response );
                if ( !response.ok ) {
                    store.commit( 'setIsSuccess', false );
                    store.commit( 'setMessageBody', response.statusText );
                    store.commit( 'setShowMessage', true );
                    if ( isBrowser ) {
                        setTimeout( () => {
                            store.commit( 'setShowMessage', false );
                            store.commit( 'setMessageBody', '' );
                            store.commit( 'setIsSuccess', true );
                        }, 5000 );
                    }
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
