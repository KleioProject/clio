import { createApp } from './app'

export default ( context ) => {
    return new Promise( ( resolve, reject ) => {
        const { app, router, store, client, axios } = createApp()

        // Set the token to the router object 
        // in order to be able to authenticate
        // the user on guarded routes at server
        // side:
        router.token = context.token || null;
        // Set token on the store's state in
        // order to get it on the client side:
        store.state.token = router.token;
        store.state.userModule.user = context.user;

        router.push( context.url );

        router.onReady(
            () => {
                console.log( `entry-server.js router.onReady: ${ context.url }` );
                const matchedComponents = router.getMatchedComponents();
                if ( !matchedComponents.length ) {
                    return reject( { code: 404 } );
                }
                Promise.all( matchedComponents.map(
                    ( component ) => {
                        if ( component.asyncAction ) {
                            const payload = component.asyncAction.payload;
                            if ( component.asyncAction.router ) {
                                payload.router = router;
                            }
                            return store.dispatch( component.asyncAction.action, payload );
                        }
                    } )
                ).then( () => {
                    context.state = store.state;
                    resolve( app );
                } ).catch( reject );
            },
            reject
        );
    } );
};
