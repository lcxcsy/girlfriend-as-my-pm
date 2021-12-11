<template>
  <div class="record-wrapper">
    <div class="person-name">{{ active ? '审批完成^_^' : '请您审批~' }}</div>
    <div class="card-wrapper">
      <van-card
        v-for="(item, index) in recordList"
        :key="index"
        :title="`申请人：${item.personName}`"
        :desc="`出差时间：${item.startTime} ~ ${item.endTime} 共${computeTotalDay(item.startTime,item.endTime)}天`"
      >
        <template #tags>
          <div>
            出差地点：{{ item.areaName }}
          </div>
          <div style="width: 100%">
            出差事由：{{ item.reason }}
          </div>
          <van-tag
            v-if="item.status === 3 || item.status === 2"
            :type="item.status === 3 ? 'success' : 'danger' "
            style="position: absolute; right: 0; top: 0;"
          >
            {{ item.status === 3 ? '审批通过' : '已拒绝' }}
          </van-tag>
        </template>
        <template #footer>
          <van-button
            v-if="isAdmin && (item.status === 1 || !item.status)"
            size="small"
            type="danger"
            style="position: absolute; left: 10px;"
            @click="handleDeal(2, item.recordId)"
          >
            拒绝
          </van-button>
          <van-button
            v-if="isAdmin && (item.status === 1 || !item.status)"
            size="small "
            type="primary"
            @click="handleDeal(3, item.recordId)"
          >
            通过
          </van-button>
        </template>
      </van-card>
    </div>
    <van-tabbar
      v-model="active"
      @change="queryTripRecord"
    >
      <van-tabbar-item icon="records">未审批</van-tabbar-item>
      <van-tabbar-item icon="good-job-o">已审批</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { queryTripRecord, updateTripRecord } from '@/api/index'
const APP_KEY = 'Ul0jhI3RRDvWkINjSckhtw=='

export default {
  name: 'Record',
  data () {
    return {
      appKey: '',
      active: 0,
      recordList: []
    }
  },
  computed: {
    isAdmin () {
      return this.appKey === APP_KEY
    }
  },
  created () {
    this.appKey = this.$route.query.appKey || sessionStorage.getItem('appKey') || ''

    if (this.appKey) {
      this.queryTripRecord()
    } else {
      Dialog.alert({ message: '您暂无权限！' })
    }
  },
  methods: {
    async queryTripRecord () {
      try {
        const { data } = await queryTripRecord({
          greatLifeKey: this.greatLifeKey,
          status: this.active ? [2, 3] : [1],
          isAdmin: this.isAdmin
        })
        this.recordList = data
      } catch (err) {
        console.log('queryTripRecord', err)
      }
    },

    computeTotalDay (startTime, endTime) {
      return (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60 * 24) + 1
    },

    // 处理审批
    async handleDeal (status, recordId) {
      try {
        await updateTripRecord({ status, recordId })
        Dialog.alert({
          message: '您已成功处理该条出差申请！'
        })
        this.queryTripRecord()
      } catch (err) {
        console.log('updateTripRecord', err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.record-wrapper {
  height: 100vh;
  padding: 140px 12px 60px 12px;
  background-image: url('~@/assets/bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .person-name {
    margin-left: 12px;
    margin-bottom: 12px;
    font-size: 24px;
    font-weight: bold;
  }
  .card-wrapper {
    width: 100%;
    height: calc(100vh - 183px);
    padding-bottom: 60px;
    overflow: scroll;
  }
  ::v-deep .van-card__desc {
    color: #323233;
  }
}
</style>
