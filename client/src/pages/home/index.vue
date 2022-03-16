<!--
 * @Author: 刘晨曦
 * @Date: 2022-03-07 14:52:33
 * @LastEditTime: 2022-03-15 14:51:25
 * @LastEditors: your name
 * @Description: 用户登录模块
 * @FilePath: \client\src\pages\home\index.vue
-->
<template>
  <div v-title data-title="江分经代OA系统" class="page-wrapper">
    <template v-if="activeBar === 0">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img style="width:100%" v-lazy="require('@/assets/images/ads-oa.png')" />
        </van-swipe-item>
        <!-- <van-swipe-item>广告招租位</van-swipe-item>
        <van-swipe-item>广告招租位</van-swipe-item>
        <van-swipe-item>广告招租位</van-swipe-item> -->
      </van-swipe>
      <div class="menu-title">我的应用</div>
      <van-grid :gutter="10" :column-num="3">
        <van-grid-item
          v-for="(item, index) in currentMenu"
          :key="index"
          :icon="require(`@/assets/images/${item.menuIcon}.png`)"
          :text="item.menuName"
          :to="item.router"
        />
      </van-grid>
      <div class="menu-title">计划书</div>
      <van-grid :gutter="10" :column-num="3">
        <van-grid-item
          v-for="(item, index) in PLAN_BOOKS"
          :key="index"
          icon="photo-o"
          :text="item.planName"
          :url="item.router"
        />
      </van-grid>
    </template>
    <AboutMe v-else />
    <van-tabbar v-model="activeBar">
      <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import AboutMe from './aboutMe.vue'
import { useUsers } from '@/hooks/useUsers'
import { MENU_PERMISSIONS, PLAN_BOOKS } from '@/config/constant'
import { defineComponent, ref, computed } from '@vue/composition-api'
export default defineComponent({
  name: 'HomePage',
  components: { AboutMe },
  setup(props, { root }) {
    const activeBar = ref(0)
    const actions = root.$store._actions
    const { getCasUserInfo } = useUsers()

    const currentUser = computed(() => {
      return root.$store.getters.userInfo
    })

    const currentMenu = computed(() => {
      const menus = MENU_PERMISSIONS.filter((item) => {
        return item.permissions.includes(currentUser.value.userType)
      })
      return menus
    })

    getCasUserInfo()
      .then((res) => {
        const data = res.dataValues
        if (data) {
          actions.syncUserInfo[0](data)
        }
      })
      .catch(() => {
        Dialog.confirm({ message: '用户信息获取失败，请重新登录' })
          .then(() => {
            actions.removeToken[0]()
            router.replace({ path: '/login' })
          })
          .catch(() => {})
      })

    return { PLAN_BOOKS, currentMenu, activeBar, currentUser }
  }
})
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  height: 100vh;
  background-color: $main-bg-color;
  .my-swipe .van-swipe-item {
    height: 150px;
    color: #fff;
    font-size: 20px;
    line-height: 160px;
    text-align: center;
    margin-bottom: 10px;
    background-color: #39a9ed;
  }
  .menu-title {
    color: #26282a;
    font-weight: 700;
    font-size: 14px;
    margin: 8px 12px;
  }
}
</style>
