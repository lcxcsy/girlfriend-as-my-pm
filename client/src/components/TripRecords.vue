<template>
  <div>
    <van-dropdown-menu style="margin: 0 -12px">
      <van-dropdown-item v-model="currentStatus" :options="STATUS_OPTION" @change="getRecords" />
    </van-dropdown-menu>
    <div class="record-wrapper">
      <van-card
        v-for="(item, index) in recordsList"
        :key="index"
        :title="`申请人：${item.userName}`"
        :desc="`出差时间：${getDateDuration(item.startTime, item.endTime)}`"
      >
        <template #tags>
          <div class="van-card__desc van-ellipsis">出差地点：{{ item.areaName }}</div>
          <div class="van-card__desc van-ellipsis">申请事由：{{ item.reason }}</div>
          <van-tag
            :type="item.status === 3 ? 'success' : item.status === 2 ? 'danger' : 'warning'"
            style="position: absolute; right: 0; top: 0"
          >
            {{ APPROVAL_STATUS[item.status] }}
          </van-tag>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { useTrip } from '@/hooks/useTrip'
import { STATUS_OPTION, APPROVAL_STATUS } from '@/config/constant'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'TripRecords',
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    }
  },
  setup(props) {
    const currentStatus = ref('1;2;3')
    const { recordsList, getTripRecords, getDateDuration } = useTrip()

    // 获取预约记录
    const getRecords = () => {
      props.userInfo.userId &&
        getTripRecords({
          userId: props.userInfo.userId,
          status: currentStatus.value.split(';').map((item) => Number(item))
        })
    }

    getRecords()

    return {
      STATUS_OPTION,
      APPROVAL_STATUS,
      currentStatus,
      recordsList,
      getDateDuration,
      getRecords
    }
  }
})
</script>

<style lang="scss" scoped>
.record-wrapper {
  margin-top: 12px;
  padding: 0 12px;
  padding-bottom: 66px;
  height: calc(100vh - 68px);
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}
</style>
