import Vue from 'vue'
import { Dialog } from 'vant'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { TOKEN_NAME } from '@/config/constant'
import routerConfig from '@/config/router.config.js'

Vue.use(Router)

const createRoute = (router) => {
  return router.reduce((preRouters, curRouter) => {
    preRouters.push(processRouteObj(curRouter))
    return preRouters
  }, [])
}

const processRouteObj = ({ component, children, ...args }) => {
  return Object.assign({
    component: () => import(`@/pages/${component}`),
    children: children ? createRoute(children) : []
  }, args)
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: createRoute(routerConfig)
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (to.meta.requireAuth) {
    const token = window.localStorage.getItem(TOKEN_NAME)
    if (token) {
      next()
    } else {
      Dialog.alert({
        message: '暂未登录，即将跳转至登录页面...'
      }).then(() => {
        window.location.replace('/great-life/login')
      })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // 完成进度条
})

export default router
