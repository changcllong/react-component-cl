const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./webpack.base.config');
const WebpackMd5Hash = require('webpack-md5-hash');

config.output.filename = './[name]@[chunkhash].js';
config.output.chunkFilename = './[name]@[chunkhash].js';

config.module.rules.push(
    {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract(
            {
                use: [
                    'css-loader',
                    'sass-loader'
                ],
                fallback: 'style-loader'
            }
        ),
        exclude: /node_modules/
    },
);

config.plugins.push(
    // 官方文档推荐使用下面的插件确保 NODE_ENV
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: false
        }
    }),
    // 取代标准webpack chunkhash
    new WebpackMd5Hash(),
    new webpack.HashedModuleIdsPlugin(),
    // 启动 minify
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    // 抽取 CSS 文件
    new ExtractTextPlugin({
        filename: '[name]@[chunkhash].css',
        allChunks: true,
        ignoreOrder: true
    })
);

module.exports = config;
