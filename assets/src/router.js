import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use( VueRouter );
/* import Playground from "./components/playground/Playground";
import Home from "./routes/home/components/Home/Home";
import Page404 from "./components/Page404/Page404"; */

function createRouter() {
    /* const Playground = r => require.ensure( [], () => r( require( './components/playground/Playground' ) ), 'play' );
    const Home = r => require.ensure( [], () => r( require( './routes/home/components/Home/Home' ) ), 'home' );
    const Page404 = r => require.ensure( [], () => r( require( './components/Page404/Page404' ) ), 'page404' );
     */
    let Playground;
    let PlaygroundDetails;
    let Home;
    let Page404;
    let Animations;
    let Search;
    let Editor;
    if ( isSSR ) {
        // console.log( '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SSR MODE; isBrowser: ', isBrowser );
        Playground = isBrowser ? () => System.import( './components/playground/Playground' ) : require( './components/playground/Playground' ).default;
        PlaygroundDetails = isBrowser ? () => System.import( './components/playground/components/details/PlaygroundDetails' ) : require( './components/playground/components/details/PlaygroundDetails' ).default;
        Home = isBrowser ? () => System.import( './routes/home/components/Home/Home' ) : require( './routes/home/components/Home/Home' ).default;
        Page404 = isBrowser ? () => System.import( './components/Page404/Page404' ) : require( './components/Page404/Page404' ).default;
        Animations = isBrowser ? () => System.import( './routes/animations/components/Animations' ) : require( './routes/animations/components/Animations' ).default;
        Search = isBrowser ? () => System.import( './routes/search/Search' ) : require( './routes/search/Search' ).default;
        Editor = isBrowser ? () => System.import( './routes/editor/Editor' ) : require( './routes/editor/Editor' ).default;
    } else {
        // console.log( '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NON SSR MODE; isBrowser: ', isBrowser );
        Playground = () => System.import( './components/playground/Playground' );
        PlaygroundDetails = () => System.import( './components/playground/components/details/PlaygroundDetails' );
        Home = () => System.import( './routes/home/components/Home/Home' );
        Page404 = () => System.import( './components/Page404/Page404' );
        Animations = () => System.import( './routes/animations/components/Animations' );
        Search = () => System.import( './routes/search/Search' );
        Editor = () => System.import( './routes/editor/Editor' );
    }


    const router = new VueRouter( {
        mode: 'history',
        scrollBehavior( to, from, savedPosition ) {
            if ( savedPosition ) {
                return savedPosition;
            }
            if ( to.hash ) {
                return { selector: to.hash };
            }
            return { x: 0, y: 0 };
        },
        routes: [
            {
                path: '/',
                component: Home,
                meta: {
                    title: 'Home'
                },
                name: 'home'
            },
            {
                path: '/home', redirect: { name: 'home' }
            },
            {
                path: '/play/:id',
                component: Playground,
                meta: {
                    title: 'Playground'
                },
                beforeEnter: ( to, from, next ) => {
                    console.log( 'Guard on component', to );
                    next();
                },
                children: [
                    {
                        path: 'details',
                        component: PlaygroundDetails,
                        meta: {
                            title: 'Playground details'
                        },
                        name: 'playgroundDetails',
                        beforeEnter: ( to, from, next ) => {
                            console.log( 'Guard on child component: ', to.path );
                            next();
                        }
                    }
                ]
            },
            {
                path: '/animations',
                component: Animations,
                meta: {
                    title: 'Animations'
                }
            },
            {
                path: '/search',
                component: Search,
                meta: {
                    title: 'Search'
                }
            },
            {
                path: '/editor',
                component: Editor,
                meta: {
                    title: 'Editor',
                    requiresLogin: true
                }
            },
            {
                path: '*',
                component: Page404,
                meta: {
                    title: '404'
                }
            }
        ]
    } );

    router.beforeEach(( to, from, next ) => {
        console.log( 'Global beforeEach: ', to.path );
        if ( isBrowser ) {
            document.title = to.meta.title;
        }
        if (isBrowser && to.meta.requiresLogin ) {
            !!localStorage.getItem( 'user' ) ? next() : next( '/' );
        } else {
            next(); //false, path, object defining route
        }
    } );

    return router;
};


export default createRouter;