'use strict'
const path = require('path')
const IP = require('ip').address();

module.exports = {
  dev: {
		template                  : path.resolve(__dirname, '../public/index.tpl'),
		assetsSubDirectory        : 'static',
		assetsPublicPath          : '/',

		// api 代理
		proxyTable                : {},

		// 开发服务器配置
		host                      : IP || 'localhost', // can be overwritten by process.env.HOST
		port                      : 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
		autoOpenBrowser           : false,
		errorOverlay              : true,
		notifyOnErrors            : true,
		poll                      : false,
		{{#lint}}
		useEslint                 : true,
		showEslintErrorsInOverlay : false,
		{{/lint}}
		devtool                   : 'eval-source-map',
		cacheBusting              : true,
		cssSourceMap              : false,
  },

  prod: {
		index                    : path.resolve(__dirname, '../dist/index.html'),
		template                 : path.resolve(__dirname, '../public/index.tpl'),
		assetsRoot               : path.resolve(__dirname, '../dist'),
		assetsSubDirectory       : 'static',
		assetsPublicPath         : '/',
		productionSourceMap      : false,
		devtool                  : '#source-map',
		productionGzip           : false,
		productionGzipExtensions : ['js', 'css'],
		bundleAnalyzerReport     : process.env.npm_config_report
  },

  ceshi: {
		index                    : path.resolve(__dirname, '../ceshi/index.html'),
		template                 : path.resolve(__dirname, '../public/index.tpl'),
		assetsRoot               : path.resolve(__dirname, '../ceshi'),
		assetsSubDirectory       : 'static',
		assetsPublicPath         : '/',
		productionSourceMap      : false,
		devtool                  : '#source-map',
		productionGzip           : false,
		productionGzipExtensions : ['js', 'css'],
		bundleAnalyzerReport     : process.env.npm_config_report
  },

  demo: {
		index                    : path.resolve(__dirname, '../demo/index.html'),
		template                 : path.resolve(__dirname, '../public/index.tpl'),
		assetsRoot               : path.resolve(__dirname, '../demo'),
		assetsSubDirectory       : 'static',
		assetsPublicPath         : '/',
		productionSourceMap      : false,
		devtool                  : '#source-map',
		productionGzip           : false,
		productionGzipExtensions : ['js', 'css'],
		bundleAnalyzerReport     : process.env.npm_config_report
  }
}
