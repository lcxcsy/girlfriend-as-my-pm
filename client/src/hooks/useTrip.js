import { Dialog, Toast } from 'vant'
import * as api from '@/api/index'
import { ref, reactive } from '@vue/composition-api'

export const useTrip = () => {
  // 表单申请的数据
  const formData = reactive({
    areaName: '',
    startTime: '',
    endTime: '',
    reason: ''
  })

  // 新增一条预约记录
  const addTripRecord = async (applyData) => {
    try {
      await api.addTripRecord(applyData)
      Dialog.alert({ message: '您已成功添加一条出差记录！' })
    } catch (err) {
      console.log(err, 'addTripRecord')
    }
  }

  // 重置表单数据
  const handleReset = () => {
    formData.areaName = ''
    formData.startTime = ''
    formData.endTime = ''
    formData.reason = ''
  }

  const recordsList = ref([])
  // 获取预约或者审批记录
  const getTripRecords = async (params) => {
    try {
      const { data } = await api.queryTripRecord(params)
      recordsList.value = data?.length ? data : []
    } catch (err) {
      console.log('getTripRecords', err)
    }
  }

  // 处理申请单
  const handleApplyForm = async (params) => {
    try {
      await api.updateTripRecord(params)
      Toast.success('处理成功！');
    } catch (err) {
      console.log('updateTripRecord', err)
    }
  }

  // 表单显示的出差时长
  const getDateDuration = (startTime, endTime) => {
    if (startTime && endTime) {
      const totalDay =
        (new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60 * 24) + 1
      return `${startTime} ~ ${endTime} 共${totalDay}天`
    } else {
      return ''
    }
  }

  return {
    recordsList,
    formData,
    addTripRecord,
    getTripRecords,
    handleReset,
    handleApplyForm,
    getDateDuration
  }
}
