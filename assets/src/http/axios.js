import axios from 'axios';

function createAxiosClient( store ) {
    const client = axios.create();

    client.interceptors.response.use( ( response ) => {
        return response;
    }, function ( error ) {
        console.dir( error.message );
        store.dispatch( 'setMessageBody', error.message );
        store.dispatch( 'setShowMessage', true );
        if ( isBrowser ) {
            setTimeout( () => {
                store.dispatch( 'setMessageBody', '' );
                store.dispatch( 'setShowMessage', false );
            }, 5000 );
        }
        return Promise.reject( error );
    } );

    return client;
};

export default createAxiosClient;
