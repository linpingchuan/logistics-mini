var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  api:'"http://192.168.3.8:8084/logistics/mini-program/wx323ba9b4db4945e3/"'
})
