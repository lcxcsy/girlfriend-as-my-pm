<!--
 * @Author: 刘晨曦
 * @Date: 2022-03-07 14:52:33
 * @LastEditTime: 2022-03-15 15:15:35
 * @LastEditors: your name
 * @Description: 用户登录模块
 * @FilePath: \client\src\pages\home\aboutMe.vue
-->
<template>
  <div class="detail-wrapper">
    <div class="info-container">
      <van-image
        round
        width="80px"
        height="80px"
        fit="cover"
        :src="require('@/assets/images/default-avatar.jpg')"
      />
      <div class="user-name">{{ currentUser.userName }}</div>
      <!-- <p class="info-introduction">说的什么，介绍一下自己吧~</p> -->
    </div>
    <van-cell-group inset>
      <!-- <van-cell title="意见反馈" is-link /> -->
      <!-- <van-cell title="友情捐赠" is-link /> -->
      <van-cell title="修改密码" is-link to="/change-psd" />
      <van-cell title="退出登录" is-link @click="handleLogout" />
    </van-cell-group>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'AboutMe',
  setup(props, { root }) {
    const router = root._router
    const actions = root.$store._actions
    const currentUser = root.$store.getters.userInfo

    const handleLogout = () => {
      Dialog.confirm({
        title: '确认',
        message: '是否退出登录'
      })
        .then(() => {
          actions.removeToken[0]()
          router.replace({ path: '/login' })
        })
        .catch(() => {})
    }

    return { currentUser, handleLogout }
  }
})
</script>

<style lang="scss" scoped>
.detail-wrapper {
  width: 100%;
  height: calc(100vh - 64px);
  .info-container {
    width: 100%;
    height: 160px;
    text-align: center;
    padding-top: 20px;
    background-color: #ffffff;
    margin-bottom: 12px;
    background-image: linear-gradient(180deg, #332175 0, #048181 100%);
    .user-name {
      font-size: 18px;
      margin-top: 4px;
      font-weight: 700;
      color: #ffffff;
    }
    .info-introduction {
      font-size: 12px;
      color: #ffffff;
    }
  }
}
</style>
