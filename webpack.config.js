const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.base.config');

config.mode = 'production';

config.output.filename = '[name]@[chunkhash].js';
config.output.chunkFilename = '[name]@[chunkhash].js';

config.module.rules.push(
    {
        test: /\.(css|scss)$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
        ],
        // use: ExtractTextPlugin.extract(
        //     {
        //         use: [
        //             'css-loader',
        //             'sass-loader'
        //         ],
        //         fallback: 'style-loader'
        //     }
        // ),
        exclude: /node_modules/
    },
);

config.optimization.minimizer = [
    new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
    }),
    new OptimizeCSSAssetsPlugin({})
];

// config.optimization.splitChunks.cacheGroups = {
//     style: {
//         name: 'style',
//         test: module => module.nameForCondition &&
//             /\.scss|css$/.test(module.nameForCondition()) &&
//             !/^javascript/.test(module.type),
//         chunks: 'all',
//         enforce: true,
//         priority: 10,
//     },
//     vendors: {
//         name: 'vendor',
//         test: /[\\/]node_modules[\\/]/,
//         chunks: 'initial',
//         priority: -10,
//         enforce: true
//     }
// };

config.plugins.push(
    // 官方文档推荐使用下面的插件确保 NODE_ENV
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false,
    //         drop_console: false
    //     }
    // }),
    // 启动 minify
    // new webpack.LoaderOptionsPlugin({ minimize: true }),
    // 取代标准webpack chunkhash
    new WebpackMd5Hash(),
    // new webpack.HashedModuleIdsPlugin(),
    // 抽取 CSS 文件
    new MiniCssExtractPlugin({
        filename: "[name]@[contenthash].css",
        // chunkFilename: "[name].chunk@[contenthash].css"
    }),
    new HtmlWebpackPlugin()
    // new ExtractTextPlugin({
    //     filename: '[name]@[contenthash].css',
    //     allChunks: true,
    //     ignoreOrder: true
    // })
);

module.exports = config;
