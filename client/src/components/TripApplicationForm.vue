<template>
  <div>
    <div class="person-name">Hi~, {{ userInfo.userName || '陌生人' }}</div>
    <van-form @submit="onFormSubmit">
      <!-- 出差地点 -->
      <van-field
        readonly
        clickable
        required
        name="picker"
        label="出差地点"
        placeholder="请选择"
        :value="formData.areaName"
        :rules="[{ required: true }]"
        @click="showAreaPicker = true"
      />
      <van-popup v-model="showAreaPicker" position="bottom">
        <van-picker
          show-toolbar
          title="出差地点"
          :columns="REGION_TREE"
          @confirm="onAreaConfirm"
          @cancel="showAreaPicker = false"
        />
      </van-popup>
      <!-- 出差时间 -->
      <van-field
        readonly
        clickable
        required
        name="calendar"
        label="出差时间"
        placeholder="请选择日期"
        :value="tripDuration"
        :rules="[{ required: true }]"
        @click="showCalendar = true"
      />
      <van-calendar
        v-model="showCalendar"
        type="range"
        :allow-same-day="true"
        @confirm="onCalendarConfirm"
      />
      <van-field
        v-model="formData.reason"
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
        <van-button round block type="primary" :disabled="submitDisabled" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import REGION_TREE from '/public/static/json/regions.json'
import { useTrip } from '@/hooks/useTrip'
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'TripApply',
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
    const { formData, getDateDuration, addTripRecord, handleReset } = useTrip()

    // 显示区域树
    const showAreaPicker = ref(false)
    const onAreaConfirm = (val) => {
      if (val[1] === '市辖区') {
        formData.areaName = val[0]
      } else {
        formData.areaName = val[0] + '-' + val[1]
      }
      showAreaPicker.value = false
    }

    // 显示日历组件
    const tripDuration = ref('')
    const showCalendar = ref(false)
    const onCalendarConfirm = (val) => {
      formData.startTime = dayjs(val[0]).format('YYYY/MM/DD')
      formData.endTime = dayjs(val[1]).format('YYYY/MM/DD')
      const { startTime, endTime } = formData
      tripDuration.value = getDateDuration(startTime, endTime)
      showCalendar.value = false
    }

    // 表单是否禁止提交
    const submitDisabled = computed(() => {
      let flag = false
      for (const key in formData) {
        if (formData[key] === '') {
          flag = true
        }
      }
      return flag
    })

    // 提交出差申请单
    const onFormSubmit = async () => {
      const userInfo = props.userInfo
      const param = {
        ...formData,
        userName: userInfo.userName,
        userId: userInfo.userId
      }
      await addTripRecord(param)
      handleReset()
      tripDuration.value = ''
    }

    return {
      formData,
      REGION_TREE,
      showAreaPicker,
      onAreaConfirm,
      tripDuration,
      showCalendar,
      onCalendarConfirm,
      submitDisabled,
      onFormSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.person-name {
  padding: 12px 16px;
  font-size: 24px;
  font-weight: bold;
}
::v-deep .van-form {
  padding: 0px 6px;
}
</style>
