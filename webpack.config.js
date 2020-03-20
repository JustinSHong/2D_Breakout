const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './public/js/game.ts',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './index.html',
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	mode: 'production',
}
