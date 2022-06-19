/*
 * @Author: 刘晨曦
 * @Date: 2021-09-06 18:23:51
 * @LastEditTime: 2022-03-11 19:05:25
 * @LastEditors: your name
 * @Description: 项目入口文件
 * @FilePath: \server\src\app.js
 */
import fs from 'fs';
import path from 'path'
import logger from 'morgan'
import express from 'express'
import cookieParser from 'cookie-parser'
import routers from './config/router.config' // Router
import expressJwt from 'express-jwt'
import { TokenUtil } from './utils/index'
import { JWT_WHITE_LIST } from './config/constant'
import Response from './controller/response'
import history from 'connect-history-api-fallback'

const app = express()
const response = new Response()
const tokenUtil = new TokenUtil()
const rootPath = path.resolve(__dirname, '..')
const publicKey = fs.readFileSync(path.join(rootPath, 'cert/lcxcsy.top.key'))

// history路由中间件
app.use(history({
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
  rewrites: [
    {
      from: /^\/.*$/, to: (context) => {
        const { pathname } = context.parsedUrl
        if (/\/api\//.test(pathname)) {
          return pathname
        } else {
          return "/";
        }
      }
    },
  ]
}))

// 解析请求的Token
app.use((req, res, next) => {
  const token = req.headers['authorization']
  if (token == undefined) {
    return next()
  } else {
    tokenUtil.verify(token).then(data => {
      req.data = data
      return next()
    }).catch(() => {
      return next()
    })
  }
})

// authentication token
app.use(expressJwt({
  secret: publicKey,
  algorithms: ['HS256']
}).unless({ path: JWT_WHITE_LIST }))

app.use(logger('dev'))
// 解析请求参数为 application-json的格式
app.use(express.json())
// 解析请求参数为 application/x-www-form-urlencoded的格式
app.use(express.urlencoded({ extended: true }))
// 解析Cookie
app.use(cookieParser())
// 设置静态资源的路径
app.use('/great-life', express.static(path.join(rootPath, 'public')))

// 根路由访问 index.html
app.get('/', function (req, res) {
  res.sendFile((path.join(rootPath + '/public/index.html')))
});

// 注册所有的路由
routers.forEach(item => {
  app.use(item.prefix, item.router)
})

// 捕获404错误, 需要在路由注册之后
app.use((req, res) => {
  res.status(404).json(response.createCustomResponse('-1', 'Not found Error'))
})

// 其他的错误捕获
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // 捕获 401 错误
  if (err.name === 'UnauthorizedError') {
    res.status(401).json(response.createCustomResponse('-1', err.message))
    return
  }
  res.status(err.status || 500)
  res.status(500).json(response.createCustomResponse('-1', 'Server Internal Error'))
})

export default app
