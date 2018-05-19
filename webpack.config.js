const path = require('path');
const webpack = require('webpack'); // eslint-disable-line no-unused-vars
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLESS = new ExtractTextPlugin('style.css');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body',
});

module.exports = {
    entry: {
        main: ['./src/main.jsx']
    },

    output: {
        path: path.resolve('public'),
        filename: 'index.js',
    },

    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src/components'),
        ],
        extensions: ['.js', '.jsx', '.less', '.gif'],
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader', // creates style nodes from JS strings
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                }, {
                    loader: 'less-loader', // compiles Less to CSS
                }],
            },
            {
                test: /\.(png|jpg|svg|gif|)$/,
                loader: 'file-loader?name=[name].[ext]'
            },
        ],
    },

    plugins:[
        HtmlWebpackPluginConfig,
        extractLESS,
    ],

    devServer: {
        historyApiFallback: true,
        hot: true,
    },
};
