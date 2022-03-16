<template>
  <div v-title data-title="渠道经理出差审批系统" class="page-wrapper">
    <div :class="{ 'records-content': true, 'empty-state': !recordsList.length }">
      <van-divider v-if="!!recordsList.length" content-position="left">{{
        currentStatus === 0
          ? `您有${recordsList.length}条消息待审批`
          : `您一共审批完${recordsList.length}条申请`
      }}</van-divider>
      <template v-if="!!recordsList.length">
        <van-card
          v-for="(item, index) in recordsList"
          :key="index"
          :title="`申请人员：${item.userName}`"
          :desc="`出差时间：${getDateDuration(item.startTime, item.endTime)}`"
        >
          <template #tags>
            <div class="van-card__desc van-ellipsis">出差地点：{{ item.areaName }}</div>
            <div class="van-card__desc van-ellipsis">出差事由：{{ item.reason }}</div>
            <van-tag
              v-if="[2, 3].includes(item.status)"
              :type="item.status === 3 ? 'success' : 'danger'"
              style="position: absolute; right: 0; top: 0"
            >
              {{ item.status === 3 ? '审批通过' : '已拒绝' }}
            </van-tag>
          </template>
          <template v-if="item.status === 1" #footer>
            <van-button
              size="small"
              type="danger"
              style="position: absolute; left: 10px"
              @click="handleDealApplication(2, item.recordId, item.userName)"
            >
              拒绝
            </van-button>
            <van-button
              size="small"
              type="primary"
              @click="handleDealApplication(3, item.recordId, item.userName)"
              >通过</van-button
            >
          </template>
        </van-card>
      </template>
      <van-empty
        v-else
        :image="require('@/assets/images/empty-data.png')"
        description="所有申请已审批完成，记得休息一下哟"
      />
    </div>
    <van-tabbar v-model="currentStatus" @change="getRecords">
      <van-tabbar-item v-if="currentStatus === 0 && !!recordsList.length" icon="records" dot
        >未审批</van-tabbar-item
      >
      <van-tabbar-item v-else icon="records">未审批</van-tabbar-item>
      <van-tabbar-item icon="good-job-o">已审批</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { useTrip } from '@/hooks/useTrip'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'BusinessTripApproval',
  setup() {
    const currentStatus = ref(0)
    const { recordsList, getTripRecords, getDateDuration, handleApplyForm } = useTrip()

    // 获取申请预约记录
    const getRecords = () => {
      getTripRecords({
        status: currentStatus.value ? [2, 3] : [1]
      })
    }

    getRecords()

    // 处理预约单
    const handleDealApplication = (status, recordId, userName) => {
      Dialog.confirm({
        message: `是否${status == 3 ? '通过' : '驳回'} ${userName} 的出差申请？`
      }).then(async () => {
        await handleApplyForm({ status, recordId })
        getRecords()
      })
    }

    return { currentStatus, recordsList, getDateDuration, getRecords, handleDealApplication }
  }
})
</script>

<style lang="scss" scoped>
.page-wrapper {
  height: 100vh;
  @include background-image('~@/assets/images/background.jpg');
  .records-content {
    width: 100%;
    height: calc(100vh - 64px);
    padding: 12px;
    overflow: scroll;
    &.empty-state {
      @include flex-center;
    }
  }
}
::v-deep .van-empty__image {
  height: 220px;
  width: 220px;
}
::v-deep .van-empty__description {
  text-align: center;
}
</style>
