<template>
  <div
    v-title
    data-title="渠道经理出差申请系统"
    :class="{ 'page-wrapper': true, 'page-top': activeBar == 0 }"
  >
    <template v-if="activeBar === 0">
      <ApplicationForm
        ref="applyFormRef"
        :userInfo="currentUser"
      />
    </template>
    <template v-else>
      <TripRecords :userInfo="currentUser" />
    </template>
    <van-tabbar v-model="activeBar">
      <van-tabbar-item icon="guide-o">出差申请</van-tabbar-item>
      <van-tabbar-item icon="search">审批查询</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import TripRecords from '@/components/TripRecords'
import ApplicationForm from '@/components/TripApplicationForm'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'BusinessTripApply',
  components: { TripRecords, ApplicationForm },
  setup (props, { root }) {
    const activeBar = ref(0)
    const currentUser = root.$store.getters.userInfo

    return { currentUser, activeBar }
  }
})
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  height: 100vh;
  padding-bottom: 64px;
  @include background-image('~@/assets/images/background.jpg');
  &.page-top {
    padding-top: 140px;
  }
}
</style>
