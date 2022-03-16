<template>
  <div class="page-wrapper" :class="{ top: activeBar == 0 }">
    <template v-if="activeBar === 0">
      <ApplyForm
        ref="applyFormRef"
        :current-user="currentUser"
        :current-user-name="currentUserName"
      />
    </template>
    <template v-else>
      <ApplyList :current-user="currentUser" />
    </template>
    <Tabbar v-model="activeBar" @change="handleTabbarChange">
      <TabbarItem icon="guide-o">出差申请</TabbarItem>
      <TabbarItem icon="search">审批查询</TabbarItem>
    </Tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useTrip } from '../hooks/useTrip'
import { Tabbar, TabbarItem, Dialog } from 'vant'
import ApplyForm from '@/components/ApplyForm.vue'
import ApplyList from '@/components/ApplyList.vue'

const currentUser = ref<string | string[]>('')
currentUser.value = useRouter().currentRoute.value.query.greatLife

const { userList, getAllUsers } = useTrip()
const currentUserName = ref<string>('')

// 获取有权限的用户，判断当前用户是否可以提交申请单
getAllUsers().then(() => {
  // 获取当前用户
  const currentUserInfo = userList.value.filter(item => item.greatLifeKey === currentUser.value)
  if (currentUserInfo.length) {
    currentUserName.value = currentUserInfo[0].userName
  } else {
    currentUserName.value = ''
    Dialog.alert({ message: '您暂无申请权限, 请联系管理员！' })
  }
})

const activeBar = ref<number>(0)
// 切换出差申请或者审批查询
const handleTabbarChange = (): void => {
  if (activeBar.value === 1) {
    console.log('handleTabbarChange', activeBar.value)
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  height: 100vh;
  padding: 0px 12px 60px 12px;
  background-image: url('@/assets/bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  &.top {
    padding-top: 140px;
  }
  .record-wrapper {
    margin-top: 12px;
    padding-bottom: 66px;
    height: calc(100vh - 62px);
    overflow: scroll;
  }
  ::v-deep(.van-cell) {
    background-color: transparent;
  }
}
</style>
