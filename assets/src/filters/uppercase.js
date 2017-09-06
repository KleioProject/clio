import Vue from "vue";

Vue.filter( 'uppercase', function ( value ) {
    let transformed = value;
    if ( typeof value === 'string' ) {
        transformed = transformed.toUpperCase();
    }
    return transformed;
} );