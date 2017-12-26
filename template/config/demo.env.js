'use strict'
const path = require('path')
module.exports = {
  NODE_ENV: '"demo"'{{#pushFile}},
  hostConfig               : {
    host       : 'loaclhost',
    username   : 'username',
    password   : 'password',
    localPath  : path.resolve(__dirname, '../demo'),
    remotePath : '/var/www'
  }{{/pushFile}}
}
