const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /.ts?$/,
                exclude: /node_modules/,
                use: [{ loader: require.resolve('ts-loader'), options: { transpileOnly: true } }],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        // Tell Webpack what extensions we're looking for
        extensions: ['.ts', '.js', '.css'],
    },
    output: {
        filename: 'module.js',
        path: path.join(__dirname, 'module/scripts'),
        publicPath: path.join(__dirname, 'module/'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Blockly',
            filename: path.join(__dirname, './module/index.html'),
            publicPath: 'scripts/',
            inject: 'head',
        }),
        // Copy over media resources from the Blockly package
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(path.dirname(require.resolve(`blockly`)), 'media'),
                    to: path.resolve(__dirname, 'module/media'),
                },
                {
                    from: path.resolve(__dirname, 'src/templates'),
                    to: path.resolve(__dirname, 'module/templates'),
                },
            ],
        }),
    ],
    devtool: 'eval-source-map',
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'module/scripts'),
        writeToDisk: true,
        injectClient: true,
        port: 30001,
        proxy: [
            {
                changeOrigin: true,
                context: (pathname) => {
                    return !pathname.match('^/sockjs');
                },
                target: 'http://localhost:30000',
                ws: true,
            },
        ],
    },
};