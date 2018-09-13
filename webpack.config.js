const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
    filename: 'styles.css'
});

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
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
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
                use: extractPlugin.extract({
                    use: [
                        'css-loader', // translates CSS into CommonJS
                        'sass-loader' // compiles Sass to CSS, using Node Sass by default
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        extractPlugin
    ]
};

