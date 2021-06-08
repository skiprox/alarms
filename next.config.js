// next.config.js
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')
const withSass = require('@zeit/next-sass')

require('dotenv').config()

// With purge css
const prodConfig = withPlugins(
  [withTM],
  withSass({
    target: 'serverless',
    distDir: '.next'
  })
);

const devConfig = withPlugins(
  [withTM],
  {
    target: 'serverless',
    distDir: '.next'
  }
)

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig
