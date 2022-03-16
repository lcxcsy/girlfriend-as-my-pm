<template>
  <div class="page-wrapper">
    <div class="hello-msg">{{ currentStatus ? '审批完成^_^' : '请您审批~' }}</div>
    <div class="cards-container">
      <Card
        v-for="(item, index) in recordsList"
        :key="index"
        :title="`申请人：${item.personName}`"
        :desc="`出差时间：${getFormatTime(item.startTime, item.endTime)}`"
      >
        <template #tags>
          <div>出差地点：{{ item.areaName }}</div>
          <div style="width: 100%">出差事由：{{ item.reason }}</div>
          <Tag
            v-if="[2, 3].includes(item.status)"
            :type="item.status === 3 ? 'success' : 'danger'"
            style="position: absolute; right: 0; top: 0"
          >
            {{ item.status === 3 ? '审批通过' : '已拒绝' }}
          </Tag>
        </template>
        <template v-if="item.status === 1" #footer>
          <Button
            size="small"
            type="danger"
            style="position: absolute; left: 10px"
            @click="handleDeal(2, item.recordId)"
          >
            拒绝
          </Button>
          <Button size="small" type="success" @click="handleDeal(3, item.recordId)">通过</Button>
        </template>
      </Card>
    </div>
    <Tabbar v-model="currentStatus" @change="getRecords">
      <TabbarItem icon="records">未审批</TabbarItem>
      <TabbarItem icon="good-job-o">已审批</TabbarItem>
    </Tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useTrip } from '../hooks/useTrip'
import { Card, Tabbar, TabbarItem, Tag, Button } from 'vant'

const { recordsList, getTripRecords, getFormatTime, handleApplyForm } = useTrip()

const currentStatus = ref<number>(0)
// 获取申请预约记录
const getRecords = () => {
  getTripRecords({
    isAdmin: true,
    status: currentStatus.value ? [2, 3] : [1]
  })
}

getRecords()

// 处理预约单
const handleDeal = async (status: number, recordId: string) => {
  await handleApplyForm({
    status,
    recordId
  })
  getRecords()
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  height: 100vh;
  padding: 100px 12px 60px 12px;
  background-image: url('@/assets/bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .hello-msg {
    margin-left: 12px;
    margin-bottom: 12px;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
  }
  .cards-container {
    width: 100%;
    height: calc(100vh - 144px);
    padding-bottom: 60px;
    overflow: scroll;
    ::v-deep(.van-card) {
      text-align: left;
    }
    ::v-deep(.van-card__desc) {
      color: #323233;
    }
  }
}
</style>
