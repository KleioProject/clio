const webpackMerge = require( 'webpack-merge' );

const hash = ( ( +new Date ) + Math.random() * 100 ).toString( 32 ).slice( -16 );

const baseConfig = require( './webpack.base' )( hash );
const clientConfig = require( './webpack.client' )( hash );
const serverConfig = require( './webpack.server' )( hash );

const mergedClientConfig = webpackMerge( clientConfig, baseConfig );
const mergedServerConfig = webpackMerge( serverConfig, baseConfig );

module.exports = [
    mergedClientConfig,
    mergedServerConfig
]