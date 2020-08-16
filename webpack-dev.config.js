const merge = require('webpack-merge')
const commonConfig = require('./base.config.js')

module.exports = merge(baseConfig, {
	devServer: {
		contentBase: './dist',
	},
	devtool: 'inline-source-map',
})
