const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './public/js/game.ts',
	devServer: {
		contentBase: './dist',
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
			},
		],
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new htmlWebpackPlugin({
			template: './index.html',
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
}
