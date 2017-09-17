
const Vue = require( 'vue' );
const { createBundleRenderer } = require( 'vue-server-renderer' );
const express = require( 'express' );
const path = require( 'path' );
const favicon = require( 'serve-favicon' );
const fs = require( 'fs' );
const cookieParser = require( 'cookie-parser' );
const bodyBarser = require( 'body-parser' );
const nodeFetch = require( 'node-fetch' );
global.fetch = nodeFetch;

const serverBundle = require( './vue-ssr-server-bundle.json' );
const clientManifest = require( './vue-ssr-client-manifest.json' );
const template = fs.readFileSync( __dirname + '/index.html', 'utf-8' );

const bundleRenderer = createBundleRenderer( serverBundle, {
    runInNewContext: false, // recommended
    template, // (optional) page template
    clientManifest
} );


const server = express();
/**
 * In order to set PORT run in the console:
 * npm run serverssr --port=XXXX
 * Example: npm run serverssr --port=8081
 */
const PORT = process.env.npm_config_port || 3003;
server.use( cookieParser() );
server.use( bodyBarser.json() );
server.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );

server.use( '/public', express.static( __dirname + '/public' ) );
server.use( '/public/images', express.static( __dirname + '/public/images' ) );
server.use( '/public/fonts', express.static( __dirname + '/public/fonts' ) );

server.get( '*', ( req, res ) => {
    console.log( `Server request url: ${ req.url }` );
    const userFromBody = { name: 'Clio' };
    const context = { url: req.url, cookies: req.cookies, token: 'I\'m token sent by client in the request.', user: userFromBody };
    /*   console.dir( req.cookies );
      if ( !Object.keys( req.cookies ).length ) {
          res.cookie( 'ssr-cookie', 'I\'m a cookie set by the server side rendring server.' );
      } */

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
