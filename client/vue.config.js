/*
 * @Author: 刘晨曦
 * @Date: 2021-09-09 11:25:38
 * @LastEditTime: 2022-03-15 14:25:13
 * @LastEditors: your name
 * @Description: VUE的配置
 * @FilePath: \client\vue.config.js
 */
const path = require('path')

module.exports = {
  publicPath: `/${process.env.VUE_APP_CONTEXT}`,
  assetsDir: process.env.VUE_APP_ASSETS,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('public', path.join(__dirname, 'public'))
  },
  productionSourceMap: false, // 生产环境下关闭sourceMap
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import '@/styles/index.scss';` // 全局样式
      }
    }
  },
  // 用于生产模式下前后端联调
  devServer: {
    // https: true,
    proxy: {
      '/great-life/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}
