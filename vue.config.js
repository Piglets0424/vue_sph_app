const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint校验
  lintOnSave: false,
  // 浏览器自动打开
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
  },
});
