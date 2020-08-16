const { merge } = require('webpack-merge')
const commonConfig = require('./base.config.js')

module.exports = merge(commonConfig, {
	devServer: {
		contentBase: './dist',
	},
	devtool: 'inline-source-map',
	mode: 'development',
})
