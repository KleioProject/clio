import { createApp } from './app';

export default ( context ) => {
    return new Promise( ( resolve, reject ) => {
        const { app, router, store, client, axios } = createApp()

        store.commit( 'setToken', context.token );
        store.commit( 'setUser', context.user );

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
                } ).catch( reject ); // set user to null and router.push('/login');
            },
            reject
        );
    } );
};
