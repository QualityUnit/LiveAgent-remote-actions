const CopyPlugin = require("copy-webpack-plugin");
const WebExtPlugin = require('web-ext-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

var config = {
    module: {
        rules: [
            {test: /\.css$/, use: 'css-loader'},
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                "@babel/plugin-transform-react-jsx",
                            ],
                            [
                                "@babel/plugin-transform-runtime",
                            ],
                        ]
                    }
                }
            }
        ]
    }
};

var optionsConfig = Object.assign({}, config, {
    entry: './src/options/main.js',
    resolve: {
        alias: {
            svelte: path.dirname(require.resolve('svelte/package.json'))
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'options.js',
    },
    // output: {
    //     path: path.join(__dirname, '/public'),
    //     filename: '[name].js',
    //     chunkFilename: '[name].[id].js'
    // },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        compilerOptions: {
                            dev: !prod
                        },
                        emitCss: prod,
                        hotReload: !prod
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                // required to prevent errors from Svelte on Webpack 5+
                test: /node_modules\/svelte\/.*\.mjs$/,
                resolve: {
                    fullySpecified: false
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    watch: prod,
    devtool: prod ? false : 'source-map',
});


var backgroudConfig = Object.assign({}, config, {
    entry: './src/bg_page.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bg_page.js',
    },
    node: {
        global: false
    },
    watch: prod,
    devtool: prod ? false : 'source-map',
});

var extensionConfig = Object.assign({}, config, {
    entry: './src/extension.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
    },
    node: {
        global: false
    },
    watch: true,
    devtool: "source-map",
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: "manifest.json", to: "manifest.json"},
                {from: "src/options/options.html", to: "options.html"},
                {from: "node_modules/webextension-polyfill/dist/browser-polyfill.js"},
            ],
        }),
        new WebExtPlugin({
            sourceDir: '../../dist',
            buildPackage: true,
            artifactsDir: "output",
            outputFilename: "liveagent_web_contact_cards-firefox.zip",
            browserConsole: true
        }),
        new WebExtPlugin({
            sourceDir: '../../dist',
            buildPackage: true,
            artifactsDir: "output",
            outputFilename: "liveagent_web_contact_cards-chromium.zip",
            target: "chromium",
            browserConsole: true
        }),
    ],
});

module.exports = [
    extensionConfig,
    optionsConfig,
    backgroudConfig
];
