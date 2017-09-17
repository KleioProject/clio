
import { createApp } from './app'

const { app, router, store } = createApp();

if ( window.__INITIAL_STATE__ ) {
    store.replaceState( window.__INITIAL_STATE__ );
}

router.onReady( () => {
    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using `router.beforeResolve()` so that all
    // async components are resolved.
    router.beforeResolve( ( to, from, next ) => {
        console.log( `entry-client.js router.beforeResolve. From: ${ from.path }. To: ${ to.path }` );
        const matched = router.getMatchedComponents( to );
        const prevMatched = router.getMatchedComponents( from );

        // we only care about none-previously-rendered components,
        // so we compare them until the two matched lists differ
        let diffed = false;
        const activated = matched.filter( ( component, index ) => {
            return diffed || ( diffed = ( prevMatched[ index ] !== component ) )
        } );

        if ( !activated.length ) {
            return next();
        }

        // Trigger a loading indicator
        Promise.all( activated.map( component => {
            if ( component.asyncAction ) {
                const payload = component.asyncAction.payload;
                if ( component.asyncAction.router ) {
                    payload.router = router;
                }
                return store.dispatch( component.asyncAction.action, payload );
            }
        } ) ).then( () => {
            // Stop the loading indicator
            next();
        } ).catch( next );
    } );
    // App.vue template root element has id="root"
    app.$mount( '#root' );
} );
