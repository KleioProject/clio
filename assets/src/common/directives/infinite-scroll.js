import Vue from 'vue';

function infiniteScrollWindowScrollHandler( container, el, treshold, event ) {
    // console.dir( event );
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
    const scrolled = container === window ? ( window.scrollY || window.pageYOffset ) : container.scrollTop;
    const dif = el.containerScrollTop - scrolled;
    el.containerScrollTop = scrolled;
    if ( scrolled + viewport >= treshold * ( el.offsetTop + el.offsetHeight ) ) {
        console.log( `Container: ${ scrolled + viewport }; Results: ${ el.offsetTop + el.offsetHeight }` );
        requestEvent.scrollDirection = dif;
        el.dispatchEvent( requestEvent );
    }
};

function getContainerElement( id ) {
    if ( id ) {
        return document.getElementById( id );
    } else {
        return window;
    }
}

Vue.directive( 'infinite-scroll', {
    inserted( el, binding, vnode ) {
        if ( isBrowser ) {
            let treshold = 1;
            if ( binding.value && binding.value.treshold && binding.value.treshold <= 1 && binding.value.treshold > 0 ) {
                treshold = binding.value.treshold;
            }
            const container = getContainerElement( binding.value ? binding.value.containerId : null );
            el.containerScrollTop = container === window ? ( window.scrollY || window.pageYOffset ) : container.scrollTop;
            el.infiniteScrollWindowScrollHandler = infiniteScrollWindowScrollHandler.bind( el, container, el, treshold );
            container.addEventListener( 'scroll', el.infiniteScrollWindowScrollHandler );
        }
    },
    unbind( el, binding, vnode ) {
        const container = getContainerElement( binding.value ? binding.value.containerId : null );
        container.removeEventListener( 'scroll', el.infiniteScrollWindowScrollHandler );
        el.infiniteScrollWindowScrollHandler = null;
    }
} );
