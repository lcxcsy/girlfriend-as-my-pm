import { Toast } from 'vant'
import * as api from '@/api/index'
import { ref } from '@vue/composition-api'

export const useUsers = () => {

  // 所有用户
  const allUsers = ref([])

  // 获取所有的用户 1为非管理员 2为管理员 不传默认为全部人员
  const getAllUsers = async (userType) => {
    try {
      const { data } = await api.getAllUsers({ userType })
      allUsers.value = data || []
    } catch (err) {
      console.log('getAllUsers', err)
    }
  }

  // 获取单点登录的用户信息
  const getCasUserInfo = async () => {
    try {
      const { data } = await api.getCasUserInfo()
      return data
    } catch (err) {
      console.log('getCasUserInfo', err);
    }
  }

  // 创建新的用户
  const createUser = async (params) => {
    try {
      await api.createUser(params)
      Toast.success('新增用户成功')
    } catch (err) {
      console.log('createUser', err);
      Toast.fail('用户新增失败')
    }
  }

  // 创建新的用户
  const updateUserInfo = async (params) => {
    try {
      await api.updateUserInfo(params)
      Toast.success('更新成功')
    } catch (err) {
      console.log('updateUserInfo', err);
      Toast.fail('更新失败')
    }
  }

  // 创建新的用户
  const deleteUser = async (uuid) => {
    try {
      await api.deleteUser(uuid)
      Toast.success('删除成功')
    } catch (err) {
      console.log('deleteUser', err);
      Toast.fail('删除失败')
    }
  }

  return {
    allUsers,
    getAllUsers,
    getCasUserInfo,
    createUser,
    updateUserInfo,
    deleteUser
  }
}