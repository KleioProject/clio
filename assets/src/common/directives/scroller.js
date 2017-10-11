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
};

function moveScroller( el, config, event ) {
    if ( config.moving ) {
        if ( !config.t ) {
            config.t = setTimeout( function () {
                const max = el.clientHeight - el.firstElementChild.clientHeight;
                let y = event.pageY - el.offsetTop - config.compensation;
                y = y <= 0 ? 0 : y;
                y = y >= max ? max : y;
                el.firstElementChild.style.transform = `translate3d(0px,${ parseInt( y ) }px, 0px)`;
                setContentScroll( y, el.firstElementChild, el.lastElementChild );
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

function setScrollerHeight( el ) {
    const oh = el.lastElementChild.offsetHeight;
    const sh = el.lastElementChild.scrollHeight;
    const h = Math.floor( Math.pow( oh, 2 ) / sh );
    el.firstElementChild.style.height = `${ h }px`;
    if ( sh <= oh ) {
        el.firstElementChild.style.display = 'none';
    } else {
        el.firstElementChild.style.display = 'block';
    }
};

function setScrollerTranslate( event ) {
    const st = event.target.scrollTop;
    const oh = event.target.offsetHeight;
    const sh = event.target.scrollHeight;
    const scrollerH = event.target.parentElement.firstElementChild.offsetHeight;
    const top = ( ( oh - scrollerH ) / ( sh - oh ) ) * st;
    event.target.parentElement.firstElementChild.style.transform = `translate3d(0px,${ parseInt( top ) }px, 0px)`;
};

function startMovingScroller( config, event ) {
    event.preventDefault();
    event.stopPropagation();
    const scrollerOffset = event.target.style.transform ? Math.floor( parseFloat( event.target.style.transform.split( ',' )[ 1 ] ) ) : 0;
    config.compensation = event.pageY - scrollerOffset - event.target.parentElement.offsetTop;
    config.moving = true;
};

function stopMovingScroller( config, event ) {
    event.preventDefault();
    event.stopPropagation();
    config.moving = false;
};

function initScroller( el, oldScr ) {
    const config = {
        compensation: 0,
        moving: false,
        t: null,
        throttle: 30
    };


    if ( oldScr ) {
        oldScr.style.transform = 'translate3d(0px, 0px, 0px)';
    } else {
        createScroller( el );
        el.style.position = 'relative';
        el.style.overflow = 'hidden';
        el.className = el.className.indexOf( 'scr-scroller-wrapper' ) > -1 ? el.className : ( el.className + ' scr-scroller-wrapper' ).trim();
    }

    el.lastElementChild.isContainer = true;
    el.lastElementChild.style.width = 'calc(100% + 35px)';
    el.lastElementChild.style.overflowY = 'scroll';
    el.lastElementChild.className = el.lastElementChild.className.indexOf( 'scr-content-container' ) > -1 ? el.lastElementChild.className : ( el.lastElementChild.className + ' scr-content-container' ).trim();

    el.startMovingScrollerHandler = function ( event ) {
        startMovingScroller( config, event );
    };
    el.stopMovingScrollerHandler = function ( event ) {
        stopMovingScroller( config, event );
    };
    el.moveScrollerHandler = function ( event ) {
        moveScroller( el, config, event );
    };
    el.setScrollerTranslateHandler = function ( event ) {
        setScrollerTranslate( event );
    };
    el.mutationObserverHandler = function ( mutations ) {
        setScrollerHeight( el );
    };

    const observerConfig = { childList: true };
    el.observer = new MutationObserver( el.mutationObserverHandler );
    el.observer.observe( el.lastElementChild, observerConfig );

    el.firstElementChild.addEventListener( 'mousedown', el.startMovingScrollerHandler );
    el.lastElementChild.addEventListener( 'scroll', el.setScrollerTranslateHandler );
    document.addEventListener( 'mousemove', el.moveScrollerHandler );
    document.addEventListener( 'mouseup', el.stopMovingScrollerHandler );
    document.addEventListener( 'mouseleave', el.stopMovingScrollerHandler );

    if ( !el.observerSelf ) {
        el.observerSelf = new MutationObserver( function ( mutations ) {
            let index = 0;
            for ( let i = 0; i < mutations.length; i++ ) {
                if ( mutations[ i ].removedNodes.length && mutations[ i ].removedNodes[ 0 ] !== el.lastElementChild && mutations[ i ].removedNodes[ 0 ].isContainer ) {
                    index = i;
                    break;
                }
            }
            let index2 = 0;
            for ( let i = 0; i < mutations.length; i++ ) {
                if ( mutations[ i ].addedNodes.length && mutations[ i ].addedNodes[ 0 ].nodeName !== "#comment" ) {
                    index2 = i;
                    break;
                }
            }
            if ( mutations[ index ] && mutations[ index ].removedNodes[ 0 ] && mutations[ index ].removedNodes[ 0 ].isContainer ) {
                clearListeners( el, mutations[ index ].removedNodes[ 0 ] );
            }
            if ( mutations[ index2 ] && mutations[ index2 ].addedNodes[ 0 ] && mutations[ index2 ].addedNodes[ 0 ].nodeName !== "#comment" ) {
                initScroller( el, el.firstElementChild );
            }
        } );
        el.observerSelf.observe( el, observerConfig );
    }

    setScrollerHeight( el );
};

function clearListeners( el, container ) {
    el.observer.disconnect();
    el.observer = null;
    el.mutationObserverHandler = null;
    el.firstElementChild.removeEventListener( 'mousedown', el.startMovingScrollerHandler );
    if ( container || el.lastElementChild ) {
        let cont = container || el.lastElementChild;
        cont.removeEventListener( 'scroll', el.setScrollerTranslateHandler );
        el.setScrollerTranslateHandler = null;
    }
    document.removeEventListener( 'mousemove', el.moveScrollerHandler );
    document.removeEventListener( 'mouseup', el.stopMovingScrollerHandler );
    document.removeEventListener( 'mouseleave', el.stopMovingScrollerHandler );
    el.startMovingScrollerHandler = null;
    el.stopMovingScrollerHandler = null;
    el.moveScrollerHandler = null;
    el.setScrollerTranslateHandler = null;
};

Vue.directive( 'scroller', {
    inserted( el, binding, vnode ) {
        if ( isBrowser ) {
            initScroller( el );
        }
    },
    unbind( el, binding, vnode ) {
        clearListeners( el );
        el.observerSelf.disconnect();
        el.observerSelf = null;
    }
} );
