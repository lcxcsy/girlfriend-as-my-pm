/*
 * @Author: 刘晨曦
 * @Date: 2021-09-09 13:47:55
 * @LastEditTime: 2021-09-10 11:17:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \widget-vue2\src\router.config.js
 */
export default [
  {
    path: '/',
    redirect: '/apply'
  }, {
    name: 'Hello',
    path: '/hello',
    component: 'Hello'
  }, {
    name: 'Apply',
    path: '/apply',
    component: 'Apply'
  }, {
    name: 'Admin',
    path: '/admin',
    component: 'Admin'
  }
]
