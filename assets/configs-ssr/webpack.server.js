const webpack = require( "webpack" );
const webpackMerge = require( 'webpack-merge' );
const VueSSRServerPlugin = require( 'vue-server-renderer/server-plugin' );
const nodeExternals = require( 'webpack-node-externals' );

const baseConfig = require( './webpack.base.js' );

const ENV = process.env.NODE_ENV = 'production';
/**
 * In order to set API url for development run in the console:
 * npm run develop --apiurl=http://someipaddress:port
 * Example: npm run production --apiurl=http://localhost:4000/ --host=http://localhost --port=8081
 */
const API_URL = process.env.npm_config_apiurl || 'http://localhost:4000/';
const HOST = process.env.npm_config_host || 'http://localhost';
const PORT = process.env.npm_config_port || '8080';

module.exports = ( hash ) => {

    return {
        devtool: 'source-map',
        entry: './src/ssr/entry-server.js',
        output:
        {
            libraryTarget: 'commonjs2'
        },
        target: 'node',
        externals: nodeExternals( {
            // do not externalize dependencies that need to be processed by webpack.
            // you can add more file types here e.g. raw *.vue files
            // you should also whitelist deps that modifies `global` (e.g. polyfills)
            whitelist: /\.s?css$/
        } ),
        plugins: [
            new VueSSRServerPlugin(),
            new webpack.DefinePlugin(
                {
                    'process.env':
                    {
                        'NODE_ENV': JSON.stringify( ENV ),
                        'API_URL': JSON.stringify( API_URL ),
                        'HOST': JSON.stringify( HOST ),
                        'PORT': JSON.stringify( PORT )
                    },
                    'isBrowser': false,
                    '__hash__': JSON.stringify( hash ),
                    'isSSR': true
                }
            ),
        ]
    }
}

//module.exports = webpackMerge( baseConfig, serverSpecificConfig );
