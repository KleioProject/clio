const path = require( 'path' );
const webpack = require( 'webpack' );
const webpackMerge = require( 'webpack-merge' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

const commonConfig = require( './webpack.common.js' );

const ENV = process.env.NODE_ENV = 'development';
/**
 * In order to set API url for development run in the console:
 * npm run develop --apiurl=http://someipaddress:port
 * Example: npm run develop --apiurl=http://localhost:4000/ --host=http://localhost --port=8081
 */
const API_URL = process.env.npm_config_apiurl || 'http://localhost:4000/';
const HOST = process.env.npm_config_host || 'http://localhost';
const PORT = process.env.npm_config_port || '8080';

console.log( ENV, API_URL, HOST, PORT );
/**
 * Configuration object with properties set for development mode.
 */
const developSpecificConfig = {
    devtool: 'cheap-module-eval-source-map',
    output:
    {
        path: path.resolve( __dirname, 'dev' ),
        publicPath: `${ HOST }:${ PORT }/`,
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin(
            {
                filename: '[name].css',
                allChunks: true
            }
        ),
        new webpack.DefinePlugin(
            {
                'process.env':
                {
                    'NODE_ENV': JSON.stringify( ENV ),
                    'API_URL': JSON.stringify( API_URL ),
                    'HOST': JSON.stringify( HOST ),
                    'PORT': JSON.stringify( PORT )
                },
                'isBrowser': true,
                'isSSR': false,
                '__hash__': JSON.stringify( 'nohash' )
            }
        )
    ],
    devServer: {
        stats: 'minimal',
        historyApiFallback: {
            index: `${ HOST }:${ PORT }/`
        },
        port: PORT
    }
}

/**
 * Merge the common config with the develop specific config.
 */
module.exports = webpackMerge( commonConfig, developSpecificConfig );
