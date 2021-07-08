const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const WebExtPlugin = require('web-ext-plugin');
const path = require('path');

var config = {
    module: {
	rules: [
	    { test: /\.css$/, use: 'css-loader' },
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
    entry: './src/options.js',
    output: {
	path: path.resolve(__dirname, 'dist'),
	filename: 'options.js',
    },
    node: {
	global: false
    },
    watch: true,
    devtool: "source-map",
    plugins: [
    	new HtmlWebpackPlugin({
    	    filename: "options.html",
    	}),
    ]
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
    watch: true,
    devtool: "source-map",
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
    		{ from: "manifest.json", to: "manifest.json" },
    		{ from: "node_modules/webextension-polyfill/dist/browser-polyfill.js" },
            ],
        }),
    	new WebExtPlugin({ sourceDir: '../../dist',  }),
    ],
});

module.exports = [
    extensionConfig,
    optionsConfig,
    backgroudConfig
];
