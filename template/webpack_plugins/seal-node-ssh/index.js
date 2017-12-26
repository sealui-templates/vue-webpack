var failed     = [];
var successful = [];

var ora        = require('ora')
var path       = require('path')
var _          = require('lodash');
var node_ssh   = require('node-ssh')
var rm         = require('rimraf')
var chalk      = require('chalk')
var error      = chalk.bold.red;
var success    = chalk.bold.green;
var spinner = new ora({
  text:success('开始上传 [ 文件 ]...'),
  spinner:"dots"
});
var ssh = new node_ssh();

function pushFile(options){
  spinner.start();
  // 连接服务器
  ssh.connect({
    host     : options.host,
    username : options.username,
    password : options.password
  }).then(function() {
    ssh.putDirectory(options.localPath,options.remotePath, {
      recursive: true,
      validate: function(itemPath) {
        const baseName = path.basename(itemPath)
        return baseName.substr(0, 1) !== '.' && // do not allow dot files
               baseName !== 'node_modules' // do not allow node_modules
      },
      tick: function(localPath, remotePath, error) {
        if (error) {
          failed.push(localPath)
        } else {
          successful.push(localPath)
        }
      }
    }).then(function(status) {
      spinner.stop()
      spinner.succeed(success('  [ 演示示例 ] 上传完成.'));
      rm(options.localPath, err => {
        if (err) throw err
        console.log('本地目录删除成功');
        console.log();
        process.exit();
      })
    }, function(error) {
      spinner.stop()
      spinner.fail(error('  示例 上传失败.\n'));
      process.exit();
    })
  })
}

function PushFileToServerPlugin(options) {
   this.options = _.extend({
    host       : 'localhost',
    password   : '',
    localPath  : '',
    remotePath : ''
   }, options);
}

PushFileToServerPlugin.prototype.apply = function(compiler) {
  var self = this;
  compiler.plugin('done', function() {
    setTimeout(function() {
      pushFile(self.options);
    },1000)
  });
};

module.exports = PushFileToServerPlugin;
