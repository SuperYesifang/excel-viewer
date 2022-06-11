const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "production",
	entry: {
		cdn: "./src/index.cdn.js"
	},
	output: {
		path: __dirname + "/dist",
		filename: "excel-viewer.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							["@babel/preset-env", {
								"useBuiltIns": "usage",
								"corejs": "2"
							}]
						]
					}
				}
			}
		]
	},
	devServer: {
		static: {
			directory: __dirname + "dist",
			publicPath: "/dist"
		},
		host: "localhost",
		port: 8080,
		compress: true,
		hot: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			hash: false,
			minify: false,
			inject: false
		})
	]
}