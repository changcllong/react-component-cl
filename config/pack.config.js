module.exports = function(config) {

    config.entry = {
        index: ['./src/pages/index.js']
    };

    config.runtimeChunk = {
        name: 'manifest'
    };

    config.commonChunks = {
        vendor: ['node_modules']
    };

    config.prd.minimizer = false;

    return config;
};
