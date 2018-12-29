// vue.config.js
module.exports = {
  // options...
  baseUrl: './',
  devServer: {
      proxy: {
          '/maoyan': {
              target: 'http://m.maoyan.com',
              ws: true, //websocket
              changeOrigin: true,    // 是否需要跨域
              pathRewrite: {
                  '^/maoyan': ''
              }
          }
      }
  }
}
