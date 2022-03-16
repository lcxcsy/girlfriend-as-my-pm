<template>
  <div v-title data-title="渠道经理考勤系统" class="page-wrapper">
    <van-nav-bar
      :title="customFormatTime(currentDate, 'day')"
      right-text="选择日期"
      @click-right="showDatePicker = true"
    />
    <van-popup v-model="showDatePicker" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择考勤日期"
        :min-date="minData"
        :max-date="maxData"
        :formatter="formatterDate"
        @cancel="showDatePicker = false"
        @confirm="handleDateConfirm"
      />
    </van-popup>
    <van-divider>当日打卡信息</van-divider>
    <div class="record-wrapper">
      <van-swipe-cell
        v-for="item in recordsList"
        :key="item.recordId"
        :disabled="currentUser.userType === 1"
      >
        <van-card
          :title="`渠道经理：${item.userName}`"
          :desc="`备注信息：${item.message}`"
          :thumb="item.faceUrlFull"
          @click-thumb="ImagePreview([item.faceUrlFull])"
        >
          <template #tags>
            <div class="van-card__desc van-ellipsis">打卡地点：{{ item.location }}</div>
            <div class="van-card__desc van-ellipsis">打卡时间：{{ item.createdTime }}</div>
          </template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="confirmDeleteRecord(item.recordId)"
          />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/index'
import { customFormatTime } from '@/utils'
import { ImagePreview, Dialog } from 'vant'
import { defineComponent, ref } from '@vue/composition-api'
export default defineComponent({
  name: 'AttendanceRecords',
  setup(props, { root }) {
    const showDatePicker = ref(false)
    const currentDate = ref(new Date())
    const minData = new Date(2020, 0, 1)
    const maxData = new Date(2026, 12, 31)
    const recordsList = ref([])
    const baseUrl = process.env.NODE_ENV === 'production' ? window.origin : 'http://localhost:3000'
    const currentUser = root.$store.getters.userInfo

    const formatterDate = (type, val) => {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      }
      return val
    }

    const handleDateConfirm = () => {
      showDatePicker.value = false
      queryAttendRecords()
    }

    const queryAttendRecords = async () => {
      try {
        const { userId, userType } = currentUser
        const startTime = customFormatTime(currentDate.value, 'custom', '00:00:00')
        const endTime = customFormatTime(currentDate.value, 'custom', '23:59:59')
        const { data } = await api.queryAttendRecords({ startTime, endTime, userId, userType })
        recordsList.value = data
          ? data.map((item) => {
              item.faceUrlFull = baseUrl + item.faceUrl
              return item
            })
          : []
      } catch (err) {
        console.log(err, 'queryAttendRecords')
      }
    }

    queryAttendRecords()

    const confirmDeleteRecord = (recordId) => {
      Dialog.confirm({
        title: '删除确认',
        message: '是否删除该条考勤记录？'
      }).then(() => {
        handleDeleteRecord(recordId)
      })
    }

    const handleDeleteRecord = async (recordId) => {
      try {
        await api.deleteAttendRecords(recordId)
        Dialog.alert({ message: '删除成功!' })
        queryAttendRecords()
      } catch (err) {
        console.log(err, 'handleDeleteRecord')
      }
    }

    return {
      currentUser,
      ImagePreview,
      showDatePicker,
      currentDate,
      customFormatTime,
      formatterDate,
      handleDateConfirm,
      minData,
      maxData,
      recordsList,
      queryAttendRecords,
      confirmDeleteRecord,
      handleDeleteRecord
    }
  }
})
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  background-color: $main-bg-color;
  .record-wrapper {
    height: calc(100vh - 102px);
    padding: 10px;
    overflow: scroll;
    .delete-button {
      height: 100%;
    }
  }
  .record-wrapper::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  ::v-deep .van-card {
    background-color: #ffffff;
    padding: 8px;
  }
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}
</style>
