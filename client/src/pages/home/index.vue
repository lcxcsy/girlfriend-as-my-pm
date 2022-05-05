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
          <img v-lazy="require('@/assets/images/ads-oa.png')" />
        </van-swipe-item>
        <van-swipe-item @click="handleClickItem">
          <img v-lazy="require('@/assets/images/ads-2.jpg')" />
        </van-swipe-item>
      </van-swipe>
      <div class="menu-title">综合行政</div>
      <van-grid :gutter="10" :column-num="3">
        <van-grid-item
          v-for="(item, index) in currentMenu"
          :key="index"
          :icon="require(`@/assets/images/icon-${item.menuIcon}.png`)"
          :text="item.menuName"
          :to="item.router"
        />
      </van-grid>
      <div class="menu-title">经营工具</div>
      <van-grid :gutter="10" :column-num="3">
        <van-grid-item
          v-for="(item, index) in DAILY_WORKS"
          :key="index"
          :icon="require(`@/assets/images/icon-${item.menuIcon}.png`)"
          :text="item.workName"
          :url="item.routerMode ? '' : item.router"
          :to="item.routerMode ? item.router : ''"
        />
      </van-grid>
      <div class="menu-title">计划书</div>
      <van-grid :gutter="10" :column-num="3" icon-size="64px">
        <van-grid-item
          v-for="(item, index) in PLAN_BOOKS"
          :key="index"
          :icon="require(`@/assets/images/icon-${item.menuIcon}.png`)"
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
import {
  MENU_PERMISSIONS,
  BUSINESS_DATA,
  PLAN_BOOKS,
  DAILY_WORKS,
} from '@/config/constant'
import { defineComponent, ref, computed } from '@vue/composition-api'
export default defineComponent({
  name: 'HomePage',
  components: { AboutMe },
  setup(props, { root }) {
    const activeBar = ref(0)
    const router = root._router
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

    const handleClickItem = () => {
      window.open(BUSINESS_DATA)
    }

    return {
      PLAN_BOOKS,
      DAILY_WORKS,
      BUSINESS_DATA,
      currentMenu,
      activeBar,
      currentUser,
      handleClickItem,
    }
  },
})
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  height: calc(100vh - 64px);
  overflow: auto;
  background-color: $main-bg-color;
  .my-swipe .van-swipe-item {
    height: 180px;
    background-color: #fffff;
    & img {
      width: 100%;
      height: 100%;
    }
  }
  .menu-title {
    color: #26282a;
    font-weight: 700;
    font-size: 14px;
    padding: 8px 12px;
  }
  &:last-child {
    box-sizing: border-box;
    padding-bottom: 16px;
  }
}
</style>
