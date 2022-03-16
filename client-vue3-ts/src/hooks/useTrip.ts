import { Dialog } from 'vant'
import * as api from '@/api/index'
import { ref, reactive } from '@vue/reactivity'
import type { APPLY_FORM, USER_TYPE, RECORD_QUERY_PARAMS, RECORD_TYPE, DEAL_PARAMS } from '@/types'
import { Ref } from '@vue/runtime-dom'

type USE_TRIP_FUN = {
  userList: Ref<Array<USER_TYPE>>
  recordsList: any
  applyFormData: any
  getAllUsers: () => Promise<void>
  addTripRecord: (applyData: APPLY_FORM) => Promise<void>
  getTripRecords: (params: RECORD_QUERY_PARAMS) => Promise<void>
  handleReset: () => void
  handleApplyForm: (params: DEAL_PARAMS) => Promise<void>
  getFormatTime: (startTime: string, endTime: string) => string
}
export const useTrip = (): USE_TRIP_FUN => {
  // 表单申请的数据
  const applyFormData = reactive<APPLY_FORM>({
    areaName: '',
    startTime: '',
    endTime: '',
    reason: ''
  })

  // 所有用户列表
  const userList = ref<Array<USER_TYPE>>([])
  // 获取所有的用户
  const getAllUsers = async () => {
    try {
      const { data } = await api.getAllUsers()
      userList.value = data?.length
        ? data.filter((item: USER_TYPE) => item.greatLifeKey !== 'superAdmin')
        : []
    } catch (err) {
      console.log('getAllUsers', err)
    }
  }

  // 新增一条预约记录
  const addTripRecord = async (applyData: APPLY_FORM) => {
    try {
      await api.addTripRecord(applyData)
      Dialog.alert({ message: '您已成功添加一条出差记录！' })
    } catch (err) {
      console.log(err, 'addTripRecord')
    }
  }

  // 重置表单数据
  const handleReset = (): void => {
    applyFormData.areaName = ''
    applyFormData.startTime = ''
    applyFormData.endTime = ''
    applyFormData.reason = ''
  }

  const recordsList = ref<Array<RECORD_TYPE>>([])
  // 获取预约或者审批记录
  const getTripRecords = async (params: RECORD_QUERY_PARAMS) => {
    try {
      const { data } = await api.queryTripRecord(params)
      recordsList.value = data?.length ? data : []
    } catch (err) {
      console.log('getAllUsers', err)
    }
  }

  // 处理申请单
  const handleApplyForm = async (params: DEAL_PARAMS) => {
    try {
      await api.updateTripRecord(params)
      Dialog.alert({ message: '您已成功处理该条出差申请！' })
    } catch (err) {
      console.log('updateTripRecord', err)
    }
  }

  // 表单显示的出差时长
  const getFormatTime = (startTime: string, endTime: string) => {
    if (startTime && endTime) {
      const totalDay =
        (new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60 * 24) + 1
      return `${startTime} ~ ${endTime} 共${totalDay}天`
    } else {
      return ''
    }
  }

  return {
    userList,
    recordsList,
    applyFormData,
    getAllUsers,
    addTripRecord,
    getTripRecords,
    handleReset,
    handleApplyForm,
    getFormatTime
  }
}
