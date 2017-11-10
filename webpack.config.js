var path = require('path');

module.exports = {
    entry: './src/app',

    output: {
        path: path.resolve (__dirname, 'docs'),
        filename: 'bundle.js'
    },

    module: {

        rules: [

            {
                test: /\.js$/,
                use: [

                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }

                ]
            }



        ]

    }
};

