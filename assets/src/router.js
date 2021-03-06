import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use( VueRouter );

function createRouter( store ) {
    let Page404;
    let Contacts;
    let Guide;
    let Home;
    let Login;
    let Profile;
    let Project;
    let Register;
    let Rules;
    let Search;

    if ( isSSR ) {
        Page404 = isBrowser ? () => System.import( './routes/404/Page404' ) : require( './routes/404/Page404' ).default;
        Contacts = isBrowser ? () => System.import( './routes/contacts/Contacts' ) : require( './routes/contacts/Contacts' ).default;
        Guide = isBrowser ? () => System.import( './routes/guide/Guide' ) : require( './routes/guide/Guide' ).default;
        Home = isBrowser ? () => System.import( './routes/home/Home' ) : require( './routes/home/Home' ).default;
        Login = isBrowser ? () => System.import( './routes/login/Login' ) : require( './routes/login/Login' ).default;
        Profile = isBrowser ? () => System.import( './routes/profile/Profile' ) : require( './routes/profile/Profile' ).default;
        Project = isBrowser ? () => System.import( './routes/project/Project' ) : require( './routes/project/Project' ).default;
        Register = isBrowser ? () => System.import( './routes/register/Register' ) : require( './routes/register/Register' ).default;
        Rules = isBrowser ? () => System.import( './routes/rules/Rules' ) : require( './routes/rules/Rules' ).default;
        Search = isBrowser ? () => System.import( './routes/search/Search' ) : require( './routes/search/Search' ).default;
    } else {
        Page404 = () => System.import( './routes/404/Page404' );
        Contacts = () => System.import( './routes/contacts/Contacts' );
        Guide = () => System.import( './routes/guide/Guide' );
        Home = () => System.import( './routes/home/Home' );
        Login = () => System.import( './routes/login/Login' );
        Profile = () => System.import( './routes/profile/Profile' );
        Project = () => System.import( './routes/project/Project' );
        Register = () => System.import( './routes/register/Register' );
        Rules = () => System.import( './routes/rules/Rules' );
        Search = () => System.import( './routes/search/Search' );
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
                path: '/clio/',
                name: 'home',
                component: Home,
                meta: {
                    title: 'Начало'
                }
            },
            {
                path: '/clio/contacts',
                name: 'contacts',
                component: Contacts,
                meta: {
                    title: 'Контакти'
                }
            },
            {
                path: '/clio/guide',
                name: 'guide',
                component: Guide,
                meta: {
                    title: 'Наръчник'
                }
            },
            {
                path: '/clio/login',
                name: 'login',
                component: Login,
                meta: {
                    title: 'Вход'
                }
            },
            {
                path: '/clio/profile',
                name: 'profile',
                component: Profile,
                meta: {
                    title: 'Профил',
                    requiresLogin: true
                }
            },
            {
                path: '/clio/project',
                name: 'project',
                component: Project,
                meta: {
                    title: 'Проект'
                }
            },
            {
                path: '/clio/register',
                name: 'register',
                component: Register,
                meta: {
                    title: 'Регистрация'
                }
            },
            {
                path: '/clio/rules',
                name: 'rules',
                component: Rules,
                meta: {
                    title: 'Правила'
                }
            },
            {
                path: '/clio/search',
                name: 'search',
                component: Search,
                meta: {
                    title: 'Търсене'
                }
            },
            {
                path: '*',
                name: '404',
                component: Page404,
                meta: {
                    title: '404'
                }
            }
        ]
    } );

    router.beforeEach( ( to, from, next ) => {
        console.log( `Router beforeEach. From: ${ from.path }. To: ${ to.path }` );
        if ( isBrowser ) {
            document.title = to.meta.title;
        }
        if ( to.meta.requiresLogin ) {
            if ( store.getters.user === null ) {
                next( '/clio/login' );
            } else {
                next();
            }
        } else {
            next(); //false, path, object defining route
        }
    } );

    return router;
};

export default createRouter;
