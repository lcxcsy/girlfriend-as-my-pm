<template>
  <DropdownMenu style="margin: 0 -12px">
    <DropdownItem v-model="currentStatus" :options="STATUS_OPTION" @change="getRecords" />
  </DropdownMenu>
  <div class="record-wrapper">
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
          :type="item.status === 3 ? 'success' : item.status === 2 ? 'danger' : 'warning'"
          style="position: absolute; right: 0; top: 0"
        >
          {{ STATUS[item.status] }}
        </Tag>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useTrip } from '@/hooks/useTrip'
import { STATUS_OPTION, STATUS } from '@/config/constant'
import { DropdownMenu, DropdownItem, Card, Tag } from 'vant'

type PROPS = { currentUser: string }
const props = withDefaults(defineProps<PROPS>(), { currentUser: '' })

const { recordsList, getTripRecords, getFormatTime } = useTrip()

const currentStatus = ref<string>('1;2;3')
// 获取预约记录
const getRecords = () => {
  getTripRecords({
    greatLifeKey: props.currentUser,
    isAdmin: false,
    status: currentStatus.value.split(';').map(item => Number(item))
  })
}
getRecords()
</script>

<style lang="scss" scoped>
.record-wrapper {
  margin-top: 12px;
  padding-bottom: 66px;
  height: calc(100vh - 62px);
  overflow: scroll;
  ::v-deep(.van-card) {
    text-align: left;
  }
}
</style>
