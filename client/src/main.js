/*
 * @Author: 刘晨曦
 * @Date: 2021-09-09 10:46:48
 * @LastEditTime: 2021-09-09 15:21:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \widget-vue2\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import '@/plugin/vant'
import 'vant/lib/index.css'
import router from '@/router/index'
import components from '@/components/index'

Vue.config.productionTip = false

const initApp = function () {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}

initApp()

components.map(({ install }) => {
  install(Vue)
})
