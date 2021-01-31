const path = require('path');

const baseConfig = require('./webpack.config');

module.exports = {
   ...baseConfig,
    devServer: {
        hot: true,
        contentBase: [path.join(__dirname, 'module/')],
        port: 3001,
        historyApiFallback: true,
        injectClient: true,
        injectHot: true,
        writeToDisk: true,
    },
};
