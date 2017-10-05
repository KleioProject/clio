import Vue from 'vue';

function infiniteScrollWindowScrollHandler( el, treshnold ) {
    let requestEvent;
    if ( typeof window.Event === 'function' ) {
        requestEvent = new Event( 'request' );
    } else if ( typeof document.createEvent === 'function' ) {
        requestEvent = document.createEvent( 'HTMLEvents' );
        requestEvent.initEvent( 'request', true, true );
    } else {
        return;
    }
    const viewport = Math.max( document.documentElement.clientHeight, window.innerHeight || 0 );
    if ( (window.scrollY || window.pageYOffset) + viewport >= treshnold * ( el.offsetTop + el.offsetHeight ) ) {
        el.dispatchEvent( requestEvent );
    }
};

Vue.directive( 'infinite-scroll', {
    inserted( el, binding, vnode ) {
        if ( isBrowser ) {
            let treshold = 0.8;
            if ( binding.value && binding.value <= 1 && binding.value > 0 ) {
                treshold = binding.value;
            }
            el.infiniteScrollWindowScrollHandler = infiniteScrollWindowScrollHandler.bind( el, el, treshold )
            window.addEventListener( 'scroll', el.infiniteScrollWindowScrollHandler );
        }
    },
    unbind( el, binding, vnode ) {
        window.removeEventListener( 'scroll', el.infiniteScrollWindowScrollHandler );
    }
} );
