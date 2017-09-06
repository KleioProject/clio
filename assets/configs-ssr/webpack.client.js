const webpack = require( "webpack" );
const webpackMerge = require( 'webpack-merge' );
const VueSSRClientPlugin = require( 'vue-server-renderer/client-plugin' );

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
        entry: './src/ssr/entry-client.js',
        output: {
            //chunkFilename: 'resources/[id].js'
        },
        plugins: [
            // Important: this splits the webpack runtime into a leading chunk
            // so that async chunks can be injected right after it.
            // this also enables better caching for your app/vendor code.
            new webpack.optimize.CommonsChunkPlugin(
                {
                    name: 'manifest',
                    minChunks: Infinity
                }
            ),
            // This plugins generates `vue-ssr-client-manifest.json` in the
            // output directory.
            new VueSSRClientPlugin(),
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
                    '__hash__': JSON.stringify( hash ),
                    'isSSR': true
                }
            ),
        ]
    }
}

//module.exports = webpackMerge( baseConfig, clientSpecificConfig );
