var webpack = require('webpack');
var path = require('path');

module.exports = {
    // Since webpack 4 we will need to set in what mode webpack is running
    mode: 'development',
    // This will be the entry file for all of our React code
    entry: [
        './client/index.jsx',
    ],
    // This will be where the final bundle file will be outputed
    output: {
        path: path.join(__dirname, '/server/public/js/'),
        filename: 'bundle.js',
        publicPath: 'server/public/js/',
    },
    // Adding babel loader to compile our javascript and jsx files
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": ["@babel/preset-env", "@babel/preset-react"]
                    }
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'resolve-url-loader'],
                include: [
                    path.join(__dirname, 'src'),
                    /node_modules/
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|ico|jpeg)$/i,
                use: [{
                    loader: 'url-loader'
                }]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.otf(\?.*)?$/,
                use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'
            },
            {
                test: /\.(le|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader'

                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css', 'less'],
    },
};