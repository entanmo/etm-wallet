'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://api.entanmo.com"'
  // BASE_API: '"http://39.105.210.35:5000"'
  // BASE_API: '"http://192.168.2.78:8080"'
  BASE_API: '"http://40.114.70.112:5050"'
})
