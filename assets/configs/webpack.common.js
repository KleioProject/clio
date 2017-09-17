const webpack = require( "webpack" );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const root = require( './../root.path' );

/**
 * Configuration object common for the develop and build configurations.
 * Puting '.html' and '.scss' in resolve -> extensions array breaks the
 * develop and production builds.
 */
module.exports = {
    entry: {
        app: './src/main.js'
    },
    resolve: {
        extensions: [ '.js', '.vue', '.scss' ],
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
                test: /\.(woff|woff2|ttf|eot)$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=public/fonts/[name].[hash].[ext]'
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=public/images/[name].[hash].[ext]'
            },
            {
                test: /\.s?css$/,
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
        new webpack.optimize.CommonsChunkPlugin( { name: [ 'app' ] } ),
        new HtmlWebpackPlugin(
            {
                template: 'src/index.html',
                chunksSortMode: 'dependency'
            }
        ),
        new CopyWebpackPlugin( [
            { from: `${ root }/node_modules/ckeditor`, to: 'public/ckeditor' }
        ] )
    ]
};
