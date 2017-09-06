const express = require( 'express' );
const history = require( 'connect-history-api-fallback' );
const app = express();
const port = 3003;
const buildPath = require( './../build.path' );

app.use( history() );
app.use( express.static( buildPath ) );

/*app.use(( req, res, next ) => {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
} );*/

app.listen( port, () => {
    console.log( `Server running on port ${ port }` );
} );

