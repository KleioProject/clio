const Vue = require( 'vue' );
const { createBundleRenderer } = require( 'vue-server-renderer' );
const express = require( 'express' );
const path = require( 'path' );
const favicon = require( 'serve-favicon' );
const fs = require( 'fs' );
const nodeFetch = require( 'node-fetch' );
global.fetch = nodeFetch;


//const buildPath = require( './../../ssr.build.path' );
const serverBundle = require( './vue-ssr-server-bundle.json' );
const clientManifest = require( './vue-ssr-client-manifest.json' );
const template = fs.readFileSync( __dirname + '/index.html', 'utf-8' );

const bundleRenderer = createBundleRenderer( serverBundle, {
    runInNewContext: false, // recommended
    template, // (optional) page template
    clientManifest
} );


const server = express();
const PORT = 3003;
server.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );

server.use( '/public', express.static( __dirname + '/public' ) );
server.use( '/public/images', express.static( __dirname + '/public/images' ) );
server.use( '/public/fonts', express.static( __dirname + '/public/fonts' ) );

server.get( '*', ( req, res ) => {
    console.log( `Server request url: ${ req.url }` );
    const context = { url: req.url };

    bundleRenderer.renderToString( context, ( err, html ) => {
        if ( err ) {
            if ( err.code === 404 ) {
                res.status( 404 ).end( `Page not found:\n${ err }` );
            } else {
                res.status( 500 ).end( `Internal server error:\n${ err }` );
            }
        } else {
            res.end( html );
        }
    } );
} );

server.listen( PORT, ( data ) => {
    console.log( `Rendering server listening on port ${ PORT }` );
} );