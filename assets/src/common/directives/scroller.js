import Vue from 'vue';

function createScroller( parent ) {
    const scroller = document.createElement( 'div' );
    scroller.style.position = 'absolute';
    scroller.style.right = '2px';
    scroller.style.width = '10px';
    scroller.style.height = '40px';
    scroller.style.opacity = '0.6';
    scroller.style.backgroundColor = 'red';
    scroller.style.borderRadius = '10px';
    scroller.style.cursor = 'pointer';
    scroller.className = 'scr-scroller';
    parent.insertBefore( scroller, parent.firstElementChild );
    return scroller;
};

function moveScroller( el, scr, container, config, event ) {
    if ( config.moving ) {
        if ( !config.t ) {
            config.t = setTimeout( function () {
                const max = el.clientHeight - scr.clientHeight;
                let y = event.pageY - el.offsetTop - config.compensation;
                y = y <= 0 ? 0 : y;
                y = y >= max ? max : y;
                scr.style.transform = `translate3d(0px,${ y }px, 0px)`;
                setContentScroll( y, scr, container );
                config.t = null;
            }, config.throttle );
        }
    }
};

function setContentScroll( y, scr, container ) {
    const st = container.scrollTop;
    const oh = container.offsetHeight;
    const sh = container.scrollHeight;
    const scrollerH = scr.offsetHeight;
    const top = ( ( oh - scrollerH ) / ( sh - oh ) ) * st;
    container.scrollTop = ( ( sh - oh ) / ( oh - scrollerH ) ) * y;
};

function setScrollerHeight( scr, container ) {
    const oh = container.offsetHeight;
    const sh = container.scrollHeight;
    const h = Math.floor( Math.pow( oh, 2 ) / sh );
    scr.style.height = `${ h }px`;
    if ( sh <= oh ) {
        scr.style.display = 'none';
    } else {
        scr.style.display = 'block';
    }
};

function setScrollerTranslate( scr, container ) {
    const st = container.scrollTop;
    const oh = container.offsetHeight;
    const sh = container.scrollHeight;
    const scrollerH = scr.offsetHeight;
    const top = ( ( oh - scrollerH ) / ( sh - oh ) ) * st;
    scr.style.transform = `translate3d(0px,${ top }px, 0px)`;
};

function startMovingScroller( el, scr, config, event ) {
    event.preventDefault();
    event.stopPropagation();
    const scrollerOffset = scr.style.transform ? Math.floor( parseFloat( scr.style.transform.split( ',' )[ 1 ] ) ) : 0;
    config.compensation = event.pageY - scrollerOffset - el.offsetTop;
    config.moving = true;
};

function stopMovingScroller( config, event ) {
    event.preventDefault();
    event.stopPropagation();
    config.moving = false;
};


Vue.directive( 'scroller', {
    inserted( el, binding, vnode ) {
        if ( isBrowser ) {
            const config = {
                compensation: 0,
                moving: false,
                t: null,
                throttle: 30
            }

            el.style.position = 'relative';
            el.style.overflow = 'hidden';
            el.className = el.className ? el.className + ' scr-scroller-wrapper' : 'scr-scroller-wrapper';

            const scr = createScroller( el );

            const container = el.lastElementChild;
            container.style.width = 'calc(100% + 35px)';
            container.style.overflowY = 'scroll';
            container.className = container.className ? container.className + ' scr-content-container' : 'scr-content-container';

            el.startMovingScroller = startMovingScroller.bind( el, el, scr, config );
            el.stopMovingScroller = stopMovingScroller.bind( el, config );
            el.moveScroller = moveScroller.bind( el, el, scr, container, config );
            el.setScrollerTranslate = setScrollerTranslate.bind( el, scr, container );
            el.observer = new MutationObserver( function ( mutations ) {
                setScrollerHeight( scr, container );
            } );
            const observerConfig = { attributes: true, childList: true, characterData: true };

            el.observer.observe( container, observerConfig );
            scr.addEventListener( 'mousedown', el.startMovingScroller );
            container.addEventListener( 'scroll', el.setScrollerTranslate );
            document.addEventListener( 'mousemove', el.moveScroller );
            document.addEventListener( 'mouseup', el.stopMovingScroller );
            document.addEventListener( 'mouseleave', el.stopMovingScroller );

            setScrollerHeight( scr, container );
        }
    },
    unbind( el, binding, vnode ) {
        el.observer.disconnect();
        el.firstElementChild.removeEventListener( 'mousedown', el.startMovingScroller );
        el.lastElementChild.removeEventListener( 'scroll', el.setScrollerTranslate );
        document.removeEventListener( 'mousemove', el.moveScroller );
        document.removeEventListener( 'mouseup', el.stopMovingScroller );
        document.removeEventListener( 'mouseleave', el.stopMovingScroller );
    }
} );
