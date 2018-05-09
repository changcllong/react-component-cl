const webpack = require('webpack');
const config = require('./webpack.base.config');

config.mode = 'development';

config.module.rules.push(
    {
        test: /\.(css|scss)$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ],
        exclude: /node_modules/
    }
);

// Hot module replacement
config.entry.index.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true');

config.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        exclude: ['vendor.js'] // vendor 通常不需要 sourcemap
    }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NoEmitOnErrorsPlugin()
);

module.exports = config;
