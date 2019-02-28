'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API:'"http://47.110.42.170:4098"'
  // BASE_API:'"http://192.168.2.72:4096"'
  // BASE_API:'"https://api.entanmo.io"'
  // BASE_API:'"http://106.14.155.8:4096"'
  BASE_API:'"http://39.105.210.35:6096"'
})
