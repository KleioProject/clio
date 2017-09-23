import axios from 'axios';

function createAxiosClient( store ) {
    const client = axios.create();

    client.interceptors.response.use(
        ( response ) => {
            console.log( 'Axios interceptors response.' );
            store.dispatch( 'addMessage', {
                headline: 'Axios Success',
                body: 'Response has been received.',
                timestamp: ( new Date() ).getTime(),
                isSuccess: true
            } );
            return response;
        },
        ( error ) => {
            store.dispatch( 'addMessage', {
                headline: 'Axios Error',
                body: error.message,
                timestamp: ( new Date() ).getTime(),
                isSuccess: false
            } );
            return Promise.reject( error );
        }
    );

    return client;
};

export default createAxiosClient;
