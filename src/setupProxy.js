// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Specify the base URL of your backend API
    createProxyMiddleware({
      target: 'http://localhost:5000', // Specify the URL of your backend API
      changeOrigin: true,
    })
  );
};
