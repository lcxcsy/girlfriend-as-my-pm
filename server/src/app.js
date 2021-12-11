/*
 * @Author: 刘晨曦
 * @Date: 2021-09-06 18:23:51
 * @LastEditTime: 2021-12-10 10:09:36
 * @LastEditors: Please set LastEditors
 * @Description: 项目入口文件
 * @FilePath: \express-collection\app.js
 */
import path from 'path'
import logger from 'morgan'
import express from 'express'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import routers, { PUBLIC_PREFIX } from './router.config' // Router
// import expressJwt from 'express-jwt'
// import { SIGN_KEY } from './constant'
import { TokenUtil } from './utils/index'
import Response from './controller/response'

const app = express()
const response = new Response()
const tokenUtil = new TokenUtil()

// parse token
app.use(function (req, res, next) {
  console.log(req.headers)
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
const whiteList = ['/', '/users/', '/users/login', '/record/add'].map(item => PUBLIC_PREFIX + item)

whiteList.push('/trip/apply')

// app.use(expressJwt({
//   secret: SIGN_KEY,
//   algorithms: ['HS256']
// }).unless({
//   path: whiteList
// }))

// view engine setup
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/trip', express.static(path.join(__dirname.replace(RegExp('(src|dist)'), ''), 'public')))
// app.use('/trip', express.static(__dirname + 'public'))

// register all routers
routers.forEach(item => {
  app.use(item.prefix, item.router)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // catch 401 error
  if (err.name === 'UnauthorizedError') {
    res.status(401)
    res.json(response.createCustomResponse('-1', err.message))
    return
  }
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
