const HtmlWebpackPlugin = require('html-webpack-plugin');
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
                            ]
                        ]
                    }
                }
            }
	]
    }
};

var extensionConfig = Object.assign({}, config, {
    entry: './src/options.js',
    output: {
	path: path.resolve(__dirname, 'dist'),
	filename: 'options.js',
    },
    node: {
	global: false
    },
    devtool: "source-map",
    plugins: [
	// new webpack.DefinePlugin({
	//     global: 'window'		// Placeholder for global used in any node_modules
	// }),
	new HtmlWebpackPlugin({
	    filename: "options.html",
	    // templateContent: ({htmlWebpackPlugin}) => `
	    //     <html>
	    // 	<head>
	    // 	    ${htmlWebpackPlugin.tags.headTags}
	    // 	</head>
	    // 	<body>
	    // 	    <h1>Hello World</h1>
	    // 	    ${htmlWebpackPlugin.tags.bodyTags}
	    // 	</body>
	    //     </html>
	    // `
	})
    ]
});

var optionsConfig = Object.assign({}, config, {
    entry: './src/extension.js',
    output: {
	path: path.resolve(__dirname, 'dist'),
	filename: 'extension.js',
    },
});

module.exports = [
    extensionConfig,
    optionsConfig
];
