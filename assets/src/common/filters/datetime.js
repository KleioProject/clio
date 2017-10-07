import Vue from "vue";

Vue.filter( 'datetime', ( timestamp, time ) => {
    let transformed = timestamp;
    if ( typeof transformed === 'number' ) {
        const date = new Date( transformed );
        transformed = `<span class="date">${ date.getDate() }.${ date.getMonth() + 1 }.${ date.getFullYear() }</span>`;
        if ( time === 'time' ) {
            transformed = `${ transformed }<span class="time"> ${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }</span>`;
        }
    }
    return transformed;
} );
