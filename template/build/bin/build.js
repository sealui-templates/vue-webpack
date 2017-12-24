'use strict'
require('../check-versions')()

//process.env.NODE_ENV = 'production'

const ora           = require('ora')
const rm            = require('rimraf')
const path          = require('path')
const chalk         = require('chalk')
const webpack       = require('webpack')
const config        = require('../../config')
const webpackConfig = require('../webpack.build.conf')

var success         = chalk.bold.green;
var error           = chalk.bold.red;
var spinner = new ora({
	text    : success('开始构建 [ '+process.env.NODE_ENV+' 环境 ]...'),
	spinner : "dots"
})
spinner.start()


rm(path.join(config[process.env.NODE_ENV]['assetsRoot'], config[process.env.NODE_ENV]['assetsSubDirectory']), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // if you are using ts-loader, setting this to true will make tyescript errors show up during build
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log('---------------------------------')
    	spinner.fail(error('  [ '+process.env.NODE_ENV+' 环境 ] 构建失败.'));
    	console.log('---------------------------------\n')
      process.exit(1)
    }

    console.log(`🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴\n`)
    spinner.succeed(success('  [ '+process.env.NODE_ENV+' 环境 ] 构建完成.'));
    console.log(`\n🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴 🌴\n`)
  })
})
