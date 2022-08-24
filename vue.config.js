const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  // 关闭eslint校验
  lintOnSave: false,
  devServer: {
    // 浏览器自动打开
    open: true,
    host: 'localhost',
    port: 8080,

    proxy: {
      // 匹配所有以 '/api'开头的请求路径
      '/api': {
        // 代理目标的基础路径
        target: 'http://gmall-h5-api.atguigu.cn',
      },
    },
  },
});
