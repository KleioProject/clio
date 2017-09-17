const express = require( 'express' );
const history = require( 'connect-history-api-fallback' );
const app = express();
const cors = require( 'cors' );
const port = 3003;
const buildPath = require( './../build.path' );

app.use( history() );
app.use( cors() );
app.use( express.static( buildPath ) );

app.listen( port, () => {
    console.log( `Server running on port ${ port }` );
} );

