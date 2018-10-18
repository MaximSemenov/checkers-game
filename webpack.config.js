const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const extractPlugin = new ExtractTextPlugin({
//     filename: 'styles.css'
// });

module.exports = {
    entry: './src/app',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },

    module: {

        rules: [

            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',

                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },

            // {
            //     test: /\.css$/, // commented line for processing pure css, but at this moment sass is used
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.scss$/,

                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]

            }

        ]




    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
          })

    ]
};

