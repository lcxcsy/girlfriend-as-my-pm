<!--
 * @Author: 刘晨曦
 * @Date: 2022-03-07 14:52:33
 * @LastEditTime: 2022-03-15 17:48:46
 * @LastEditors: your name
 * @Description: 用户登录模块
 * @FilePath: \client\src\pages\personManage\index.vue
-->
<template>
  <div v-title data-title="人员管理" class="page-wrapper">
    <van-search v-model="searchKey" placeholder="请输入搜索关键词" />
    <van-contact-list
      :list="personList"
      default-tag-text="管理员"
      add-text="新增人员"
      @edit="onEdit"
      @add="onAdd"
    />
    <van-popup v-model="showPopup" round closeable position="bottom" :safe-area-inset-bottom="true">
      <van-cell-group inset>
        <van-field
          v-model="formData.userId"
          label="账号"
          maxlength="32"
          placeholder="请输入账号"
          label-width="6rem"
          clearable
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="formData.userName"
          label="姓名"
          maxlength="32"
          placeholder="请输入姓名"
          label-width="6rem"
          clearable
          :rules="[{ required: true }]"
        />
        <van-field name="switch" label-width="6rem" label="是否为管理员">
          <template #input>
            <van-switch v-model="formData.userType" size="20" />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 24px">
        <van-button
          block
          round
          type="primary"
          style="margin-bottom: 12px"
          :disabled="!validateSuccess"
          @click="handleAddOrUpdateUser"
          >保存</van-button
        >
        <van-button v-if="popupType === 'edit'" @click="handleDeleteUser" block round
          >删除</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { useUsers } from '@/hooks/useUsers'
import { defineComponent, ref, computed, reactive } from '@vue/composition-api'
export default defineComponent({
  name: 'PersonManage',
  setup(props, { root }) {
    const getters = root.$store.getters
    const userInfo = getters.userInfo
    const { allUsers, getAllUsers, createUser, updateUserInfo, deleteUser } = useUsers()
    const searchKey = ref('')
    const showPopup = ref(false)
    const popupType = ref('add')
    const formData = reactive({
      uuid: '',
      userName: '',
      userId: '',
      userType: false
    })
    getAllUsers()

    const personList = computed(() => {
      const formatData = allUsers.value
        .filter(
          (item) =>
            item.userType !== 3 &&
            item.userName.indexOf(searchKey.value) > -1 &&
            item.userId !== userInfo.userId
        )
        .map((item) => {
          item.name = item.userName
          item.id = item.userId
          item.tel = item.userId
          item.isDefault = item.userType === 2
          return item
        })
        .sort((str1, str2) => {
          return str1.userName.localeCompare(str2.userName, 'zh')
        })
      return formatData
    })

    const onEdit = (userInfo) => {
      showPopup.value = true
      popupType.value = 'edit'
      formData.uuid = userInfo.uuid
      formData.userName = userInfo.userName
      formData.userId = userInfo.userId
      formData.userType = userInfo.userType === 2
    }

    const onAdd = () => {
      showPopup.value = true
      popupType.value = 'add'
      formData.uuid = ''
      formData.userName = ''
      formData.userId = ''
      formData.userType = false
    }

    const handleAddOrUpdateUser = async () => {
      if (popupType.value === 'add') {
        await createUser({
          userName: formData.userName,
          userId: formData.userId,
          userType: formData.userType ? 2 : 1
        })
        showPopup.value = false
        getAllUsers()
      } else {
        await updateUserInfo(formData)
        showPopup.value = false
        getAllUsers()
      }
    }

    const validateSuccess = computed(() => {
      const { userId, userName } = formData
      if (userId.length >= 1 && userName.length >= 1) {
        return true
      } else {
        return false
      }
    })

    const handleDeleteUser = () => {
      Dialog.confirm({
        title: '确认',
        message: `是否删除 ${formData.userName}`
      })
        .then(async () => {
          await deleteUser(formData.uuid)
          showPopup.value = false
          getAllUsers()
        })
        .catch(() => {})
    }

    return {
      personList,
      searchKey,
      onEdit,
      onAdd,
      showPopup,
      popupType,
      formData,
      validateSuccess,
      handleDeleteUser,
      handleAddOrUpdateUser
    }
  }
})
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  height: 100vh;
  // background-color: $main-bg-color;
  ::v-deep .van-contact-list {
    height: calc(100% - 54px);
    padding-bottom: 60px;
  }
  ::v-deep .van-contact-list__edit {
    left: 92%;
    z-index: 999;
  }
  ::v-deep .van-radio {
    display: none;
  }
  ::v-deep .van-contact-list__item-value {
    padding-left: 0px;
  }
  ::v-deep .van-cell-group--inset {
    padding-top: 48px;
  }
}
</style>
