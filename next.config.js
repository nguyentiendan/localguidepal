const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080/api/v2' // development api
        : 'http://localhost:3000/api' // production api
  },
  i18n,
  devtool: "source-map",
  pwa: {
    //disable: process.env.NODE_ENV === 'development',
    register: true,
    dest: 'public',
    swSrc: 'service-worker.js',
  },
})
