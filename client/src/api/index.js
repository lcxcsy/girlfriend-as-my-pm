/*
 * @Author: your name
 * @Date: 2021-09-09 14:58:32
 * @LastEditTime: 2022-03-15 17:59:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \client\src\api\index.js
 */
import http from '@/api/httpInstance'

function userLogin(params) {
  return http({
    method: 'post',
    url: '/great-life/api/users/login',
    authRequired: false,
    data: params
  })
}

function getCasUserInfo() {
  return http({
    method: 'get',
    url: '/great-life/api/users/cas',
    authRequired: true,
    dontNeedNotify: true
  })
}

function createUser(params) {
  return http({
    method: 'post',
    url: '/great-life/api/users/create',
    data: params,
    authRequired: true,
  })
}

function deleteUser(id) {
  return http({
    method: 'get',
    url: `/great-life/api/users/delete/${id}`,
    authRequired: true,
  })
}

function updateUserInfo(params) {
  return http({
    method: 'post',
    url: '/great-life/api/users/update',
    authRequired: true,
    data: params
  })
}


function getAllUsers(params) {
  return http({
    method: 'get',
    url: '/great-life/api/users/all',
    authRequired: true,
    params: params
  })
}

function addTripRecord(params) {
  return http({
    method: 'post',
    url: '/great-life/api/trip/records/create',
    authRequired: true,
    data: params
  })
}

function queryTripRecord(params) {
  return http({
    method: 'post',
    url: '/great-life/api/trip/records/query',
    authRequired: true,
    data: params
  })
}

function updateTripRecord(params) {
  return http({
    method: 'post',
    url: '/great-life/api/trip/records/update',
    authRequired: true,
    data: params
  })
}

function uploadImage(params) {
  return http({
    method: 'post',
    url: '/great-life/api/attend/records/upload',
    authRequired: true,
    data: params
  })
}

function createAttendRecord(params) {
  return http({
    method: 'post',
    url: '/great-life/api/attend/records/create',
    authRequired: true,
    data: params
  })
}

function queryAttendRecords(params) {
  return http({
    method: 'post',
    url: '/great-life/api/attend/records/query',
    authRequired: true,
    data: params
  })
}

function deleteAttendRecords(id) {
  return http({
    method: 'get',
    url: `/great-life/api/attend/records/delete/${id}`,
    authRequired: true,
  })
}

export {
  userLogin,
  createUser,
  deleteUser,
  updateUserInfo,
  getCasUserInfo,
  getAllUsers,
  addTripRecord,
  queryTripRecord,
  updateTripRecord,
  uploadImage,
  createAttendRecord,
  queryAttendRecords,
  deleteAttendRecords
}
