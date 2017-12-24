'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = {{#if_or unit e2e}}process.env.NODE_ENV === 'testing'
	? require('../config/test.env')
	: {{/if_or}}require('../config/'+process.env.NODE_ENV+'.env')

const webpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({
			sourceMap  : config[process.env.NODE_ENV]['productionSourceMap'],
			extract    : true,
			usePostCSS : true
		})
	},
	devtool: config[process.env.NODE_ENV]['productionSourceMap'] ? config[process.env.NODE_ENV]['devtool'] : false,
	output: {
		path          : config[process.env.NODE_ENV]['assetsRoot'],
		filename      : utils.assetsPath('js/[chunkhash].js'),
		chunkFilename : utils.assetsPath('js/[chunkhash].js'),
		publicPath    : config[process.env.NODE_ENV]['assetsPublicPath']
	},
	externals : {
		"vue"        : "Vue"{{#axios}},
		"axios"      : "axios"{{/axios}}{{#router}},
		"vue-router" : "VueRouter"{{/router}}{{#isMobile}},
		"fastclick"  : "FastClick"{{/isMobile}}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': env
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					warnings: false,
					drop_console: true,
				},
				output : {
					ascii_only : true
				},
				comments: false,
			},
			sourceMap: config[process.env.NODE_ENV]['productionSourceMap'],
			parallel: true
		}),
		new ExtractTextPlugin({
			filename: utils.assetsPath('css/[contenthash].css'),
			allChunks: true,
		}),
		new OptimizeCSSPlugin({
			cssProcessorOptions: config[process.env.NODE_ENV]['productionSourceMap']
				? { safe: true, map: { inline: false } }
				: { safe: true }
		}),
		new HtmlWebpackPlugin({
			filename    : config[process.env.NODE_ENV]['index'],
			template    : config[process.env.NODE_ENV]['template'],
			inject      : true,
			hash        : false,
			releaseTime : (new Date()).getTime(),
			minify: {
        removeAttributeQuotes         : false,
        removeComments                : true,
        collapseWhitespace            : true,
        removeRedundantAttributes     : true,
        useShortDoctype               : true,
        removeEmptyAttributes         : true,
        removeStyleLinkTypeAttributes : true,
        keepClosingSlash              : true,
        minifyJS                      : true,
        minifyCSS                     : true,
        minifyURLs                    : true
      },
			chunksSortMode: 'dependency'
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			minChunks (module) {
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname, '../node_modules')
					) === 0
				)
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'app',
			async: 'vendor-async',
			children: true,
			minChunks: 3
		})
	]
})

if (config[process.env.NODE_ENV]['productionGzip']) {
	const CompressionWebpackPlugin = require('compression-webpack-plugin')

	webpackConfig.plugins.push(
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp(
				'\\.(' +
				config[process.env.NODE_ENV]['productionGzipExtensions'].join('|') +
				')$'
			),
			threshold: 10240,
			minRatio: 0.8
		})
	)
}

if (config[process.env.NODE_ENV]['bundleAnalyzerReport']) {
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
	webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
