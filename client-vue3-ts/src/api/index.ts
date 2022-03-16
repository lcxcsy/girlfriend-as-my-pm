import http from './httpInstance'
import type { APPLY_FORM, DEAL_PARAMS, RECORD_QUERY_PARAMS } from '@/types'

function getUserInfo() {
  return http({
    url: '/getUserInfo',
    method: 'get'
  })
}

function getAllUsers() {
  return http({
    method: 'get',
    url: '/trip/api/v1/users/all'
  })
}

function addTripRecord(params: APPLY_FORM) {
  return http({
    method: 'post',
    url: '/trip/api/v1/record/create',
    data: params
  })
}

function queryTripRecord(params: RECORD_QUERY_PARAMS) {
  return http({
    method: 'post',
    url: '/trip/api/v1/record/query',
    data: params
  })
}

function updateTripRecord(params: DEAL_PARAMS) {
  return http({
    method: 'post',
    url: '/trip/api/v1/record/update',
    data: params
  })
}

export { getUserInfo, getAllUsers, addTripRecord, queryTripRecord, updateTripRecord }
