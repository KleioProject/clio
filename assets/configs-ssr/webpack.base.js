const webpack = require( "webpack" );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
const webpackMerge = require( 'webpack-merge' );
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const CompressionPlugin = require( "compression-webpack-plugin" );

const buildPath = require( './../ssr.build.path' );

const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const root = require( './../root.path' );
/**
 * Configuration object common for the develop and build configurations.
 * Puting '.html' and '.scss' in resolve -> extensions array breaks the
 * develop and production builds.
 */
module.exports = ( hash ) => {
    const baseConfig = {
        stats: {
            assets: true,
            excludeAssets: [ /ckeditor/ ],
        },
        output: {
            path: buildPath,
            publicPath: '/',
            filename: `public/${ hash }.[name].js`
        },
        resolve: {
            extensions: [ '.js', '.vue' ],
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    exclude: /node-modules/,
                    options: {
                        esModule: true
                    }
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node-modules/
                },
                {
                    test: /\.html$/,
                    exclude: /node-modules/,
                    use: 'html-loader'
                },
                {
                    test: /\.(woff|woff2|ttf|eot)(\?\S*)?$/,
                    exclude: /node_modules/,
                    loader: `file-loader?name=public/fonts/${ hash }.[name].[ext]`,
                },
                {
                    test: /\.(png|jpe?g|gif|svg|ico)$/,
                    exclude: /node_modules/,
                    loader: `file-loader?name=public/images/${ hash }.[name].[ext]`
                },
                {
                    test: /\.scss$/,
                    exclude: /src/,
                    loader: ExtractTextPlugin.extract( {
                        fallback: 'style-loader',
                        use: [ 'css-loader?sourceMap', 'postcss-loader', 'sass-loader' ]
                    } )
                },
                {
                    test: /\.(graphql|gql)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'gql-loader',
                        options: {
                            baseDir: `${ root }/src/graphql`
                        }
                    }
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin( { template: 'src/ssr/index.html', inject: false } ),
            new webpack.NoEmitOnErrorsPlugin(),
            new ExtractTextPlugin( `public/${ hash }.[name].css` ),
            new webpack.LoaderOptionsPlugin(
                {
                    htmlLoader:
                    {
                        minimize: false
                    }
                }
            ),
            new CopyWebpackPlugin( [
                { from: `${ root }/node_modules/ckeditor`, to: 'public/ckeditor' }
            ] )
        ]
    }
    if ( process.env.npm_config_env === 'production' ) {
        baseConfig.plugins.push( new webpack.optimize.UglifyJsPlugin() );
        baseConfig.plugins.push( new OptimizeCssAssetsPlugin() );
    }

    return baseConfig;
};
