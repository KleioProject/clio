import axios from 'axios';

function createAxiosClient( store ) {
    const client = axios.create();

    client.interceptors.response.use(
        ( response ) => {
            console.log( 'Axios interceptors response.' );
            return response;
        },
        ( error ) => {
            console.dir( error );
            store.dispatch( 'setIsSuccess', false );
            store.dispatch( 'setMessageBody', error.message );
            store.dispatch( 'setShowMessage', true );
            if ( isBrowser ) {
                setTimeout( () => {
                    store.dispatch( 'setShowMessage', false );
                    store.dispatch( 'setMessageBody', '' );
                    store.dispatch( 'setIsSuccess', true );
                }, 5000 );
            }
            return Promise.reject( error );
        }
    );

    return client;
};

export default createAxiosClient;
