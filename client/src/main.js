import Vue from 'vue'
import App from './App.vue'
import '@/plugin/vant'
import 'vant/lib/index.css'
import router from '@/router'
import store from '@/store'
import { Lazyload } from 'vant'
import VueCompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false
Vue.use(Lazyload)
Vue.use(VueCompositionAPI)
// 设置游览器标题
Vue.directive('title', {
  inserted: function (el) {
    document.title = el.dataset.title
  }
})

const initApp = function () {
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
}

initApp()