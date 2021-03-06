'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://api.entanmo.com"'
  BASE_API: '"http://39.105.210.35:5000"'
})
