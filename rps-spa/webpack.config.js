var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080',
		path.resolve(__dirname, 'src/main.js')
	],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: "bundle.js"
	},

	plugins: [
		new HtmlWebpackPlugin({title: 'RPS Game', template: 'index.template.html'})
	],


	postcss: function () {
		return [autoprefixer];
	},


	module: {
		loaders: [

			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},

			{
				test: /\.scss$/,
				loader: "style-loader!css-loader!sass!postcss"
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url?limit=25000'
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules\/(?!rps-core)/,
				loader: 'babel'
			}

		]
	},

	devtool: 'eval',
	devServer: {
		contentBase: "./build"
	}

};
