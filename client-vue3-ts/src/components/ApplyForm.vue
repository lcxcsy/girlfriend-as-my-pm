<template>
  <div class="person-name">Hi~, {{ currentUserName || '陌生人' }}</div>
  <Form @submit="onSubmit">
    <!-- 出差地点 -->
    <Field
      v-model="applyFormData.areaName"
      readonly
      clickable
      required
      name="picker"
      label="出差地点"
      placeholder="请选择"
      :rules="[{ required: true }]"
      @click="showAreaPicker = true"
    />
    <Popup v-model:show="showAreaPicker" position="bottom">
      <Picker
        show-toolbar
        title="出差地点"
        :columns="AREA_TREE"
        @confirm="onAreaConfirm"
        @cancel="showAreaPicker = false"
      />
    </Popup>
    <!-- 出差时间 -->
    <Field
      v-model="formatTime"
      readonly
      clickable
      required
      name="calendar"
      label="出差时间"
      placeholder="请选择日期"
      :rules="[{ required: true }]"
      @click="showCalendar = true"
    />
    <Calendar
      v-model:show="showCalendar"
      type="range"
      :allow-same-day="true"
      @confirm="onCalendarConfirm"
    />
    <Field
      v-model="applyFormData.reason"
      rows="2"
      autosize
      required
      label="申请事由"
      type="textarea"
      maxlength="50"
      placeholder="请说明出差渠道机构、工作内容"
      show-word-limit
      :rules="[{ required: true }]"
    />
    <div style="margin: 16px 100px">
      <Button round block type="primary" :disabled="submitDisabled" native-type="submit">
        提交
      </Button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { AREA_ITEM } from '@/types'
import { useTrip } from '@/hooks/useTrip'
import { AREA_TREE } from '@/config/constant'
import { computed, ref } from '@vue/reactivity'
import { Form, Field, Picker, Button, Popup, Calendar } from 'vant'

type PROPS = { currentUser: string; currentUserName: string }
const props = withDefaults(defineProps<PROPS>(), { currentUser: '', currentUserName: '' })

const { applyFormData, getFormatTime, addTripRecord, handleReset } = useTrip()

// 显示区域树
const showAreaPicker = ref<boolean>(false)
// 区域确认
const onAreaConfirm = (val: Array<AREA_ITEM>) => {
  if (val[1].text === '市辖区') {
    applyFormData.areaName = val[0].text
  } else {
    applyFormData.areaName = val[0].text + '-' + val[1].text
  }
  showAreaPicker.value = false
}

// 显示日历组件
const showCalendar = ref<boolean>(false)
const formatTime = ref<string>('')
// 日历组件确定
const onCalendarConfirm = (val: Array<Date>) => {
  applyFormData.startTime = dayjs(val[0]).format('YYYY/MM/DD')
  applyFormData.endTime = dayjs(val[1]).format('YYYY/MM/DD')
  const { startTime, endTime } = applyFormData
  formatTime.value = getFormatTime(startTime, endTime)
  showCalendar.value = false
}

// 表单是否禁止提交
const submitDisabled = computed((): boolean => {
  let flag = false
  for (const key in applyFormData) {
    if (applyFormData[key] === '') {
      flag = true
    }
  }
  return flag
})

// 提交出差申请单
const onSubmit = async () => {
  const param = {
    ...applyFormData,
    personName: props.currentUserName,
    greatLifeKey: props.currentUser
  }
  await addTripRecord(param)
  handleReset()
  formatTime.value = ''
}
</script>

<style lang="scss" scoped>
.person-name {
  margin-left: 12px;
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
}
::v-deep(.van-button--primary) {
  background-color: rgb(224 207 153);
  border: 0px solid #1989fa;
  color: black;
  font-weight: 900;
}
</style>
