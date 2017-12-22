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
  : {{/if_or}}require('../config/ceshi.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
			sourceMap  : config.ceshi.productionSourceMap,
			extract    : true,
			usePostCSS : true
    })
  },
  devtool: config.ceshi.productionSourceMap ? config.ceshi.devtool : false,
  output: {
		path          : config.ceshi.assetsRoot,
		filename      : utils.assetsPath('js/[chunkhash].js'),
		chunkFilename : utils.assetsPath('js/[chunkhash].js'),
		publicPath    : config.ceshi.assetsPublicPath
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
	        ascii_only : true,
	      },
	      comments: false,
      },
      sourceMap: config.ceshi.productionSourceMap,
      parallel: true
    }),
    // 提取css文件
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[contenthash].css'),
      allChunks: true,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.ceshi.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new HtmlWebpackPlugin({
			filename    : config.ceshi.index,
			template    : config.ceshi.template,
			inject      : true,
			hash        : false,
			releaseTime : (new Date()).getTime(),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
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

if (config.ceshi.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.ceshi.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.ceshi.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
