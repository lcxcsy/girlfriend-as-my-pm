/*
 * @Author: 刘晨曦
 * @Date: 2021-03-17 09:36:24
 * @LastEditTime: 2021-09-07 19:18:10
 * @LastEditors: Please set LastEditors
 * @Description: 所有路由的入口文件
 * @FilePath: \server\router.config.js
 */
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import recordRouter from './routes/record'

export const PUBLIC_PREFIX = '/trip/api/v1'

export default [
  {
    prefix: PUBLIC_PREFIX + '/',
    router: indexRouter
  }, {
    prefix: PUBLIC_PREFIX + '/users',
    router: usersRouter
  }, {
    prefix: PUBLIC_PREFIX + '/record',
    router: recordRouter
  }
]
