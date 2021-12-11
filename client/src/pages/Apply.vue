<template>
  <div
    class="apply-wrapper"
    :style="{paddingTop:`${active ? 0 : 140}px`}"
  >
    <template v-if="active === 0">
      <div class="person-name">Hi~, {{ formData.personName || '陌生人' }}</div>
      <van-form @submit="onSubmit">
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
        <van-popup
          v-model="showAreaPicker"
          position="bottom"
        >
          <van-picker
            show-toolbar
            title="出差地点"
            :columns="areaColumns"
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
          :value="formatTime"
          :rules="[{ required: true }]"
          @click="handelShowCalendar"
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
        <van-calendar
          v-model="showCalendar"
          type="range"
          :allow-same-day="true"
          @confirm="onCalendarConfirm"
        />
        <div style="margin: 16px 100px;">
          <van-button
            round
            block
            type="info"
            :disabled="submitDisabled"
            native-type="submit"
          >
            提交
          </van-button>
        </div>
      </van-form>
    </template>
    <template v-else>
      <van-dropdown-menu style="margin: 0 -12px;">
        <van-dropdown-item
          v-model="searchKey"
          :options="dropdownOption"
          @change="handleDropDownChange"
        />
      </van-dropdown-menu>
      <div class="record-wrapper">
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
              :type="item.status === 3 ? 'success' : item.status === 2 ? 'danger' : 'warning'"
              style="position: absolute; right: 0; top: 0;"
            >
              {{ item.status === 3 ? '审批通过' : item.status === 2 ? '已拒绝' : '未审批' }}
            </van-tag>
          </template>
        </van-card>
      </div>
    </template>
    <van-tabbar
      v-model="active"
      @change="handleTabbarChange"
    >
      <van-tabbar-item icon="guide-o">出差申请</van-tabbar-item>
      <van-tabbar-item icon="search">审批查询</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { AREA_TREE } from '@/constant'
import { addTripRecord, getAllUsers, queryTripRecord } from '@/api'
import { Dialog } from 'vant'

export default {
  name: 'Apply',
  data () {
    return {
      usersData: [],
      greatLifeKey: '',
      formData: {
        personName: '',
        areaName: '',
        startTime: '',
        endTime: '',
        reason: ''
      },
      showAreaPicker: false,
      areaColumns: AREA_TREE,
      showCalendar: false,
      calendarType: 'start',
      recordList: [],
      active: 0,
      showPopover: false,
      searchKey: 0,
      dropdownOption: [
        { text: '全部', value: 0 },
        { text: '已审批', value: 1 },
        { text: '未审批', value: 2 }
      ]
    }
  },
  computed: {
    submitDisabled () {
      let flag = false
      for (const key in this.formData) {
        if (this.formData[key] === '') {
          flag = true
        }
      }
      return flag
    },

    formatTime () {
      const { startTime, endTime } = this.formData
      const totalDay = this.computeTotalDay(startTime, endTime)
      if (this.formData.startTime && this.formData.endTime) {
        return `${startTime} ~ ${endTime} 共${totalDay}天`
      } else {
        return ''
      }
    }
  },
  async created () {
    await this.getAllUsers()
    this.greatLifeKey = this.$route.query.greatLife ||
      sessionStorage.getItem('greatLifeKey') || ''
    const filterData = this.usersData
      .filter(item => item.greatLifeKey === this.greatLifeKey)

    if (this.greatLifeKey && filterData.length) {
      this.formData.personName = filterData[0].userName
      sessionStorage.setItem('greatLifeKey', this.greatLifeKey)
      this.queryTripRecord()
    } else {
      Dialog.alert({ message: '您暂无申请权限！' })
    }
  },
  methods: {
    async getAllUsers () {
      try {
        const { data } = await getAllUsers()
        this.usersData = data.filter(item => item.greatLifeKey !== 'superAdmin')
      } catch (err) {
        console.log('getAllUsers', err)
      }
    },

    handelShowCalendar () {
      this.showCalendar = true
    },
    async onSubmit () {
      try {
        this.formData.greatLifeKey = this.greatLifeKey
        await addTripRecord(this.formData)
        Dialog.alert({ message: '您已成功添加一条出差记录！' })
        this.formData.areaName = ''
        this.formData.startTime = ''
        this.formData.endTime = ''
        this.formData.reason = ''
      } catch (err) {
        console.log(err, 'onSubmit')
      }
    },

    onAreaConfirm (val) {
      if (val[1] === '市辖区') {
        this.formData.areaName = val[0]
      } else {
        this.formData.areaName = val[0] + '-' + val[1]
      }
      this.showAreaPicker = false
    },

    onCalendarConfirm (value) {
      this.formData.startTime = dayjs(value[0]).format('YYYY/MM/DD')
      this.formData.endTime = dayjs(value[1]).format('YYYY/MM/DD')
      this.showCalendar = false
    },

    computeTotalDay (startTime, endTime) {
      return (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60 * 24) + 1
    },

    async queryTripRecord () {
      try {
        const { data } = await queryTripRecord({
          greatLifeKey: this.greatLifeKey,
          isAdmin: false,
          status: this.searchKey === 0 ? [1, 2, 3] : this.searchKey === 1 ? [2, 3] : [1]
        })
        this.recordList = data
      } catch (err) {
        console.log('queryTripRecord', err)
      }
    },

    handleTabbarChange () {
      if (this.active === 1) {
        this.queryTripRecord()
      }
    },

    handleDropDownChange () {
      this.queryTripRecord()
    }
  }
}
</script>

<style lang="scss" scoped>
.apply-wrapper {
  width: 100%;
  height: 100vh;
  padding: 0px 12px 60px 12px;
  background-image: url('~@/assets/bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .person-name {
    margin-left: 12px;
    margin-bottom: 12px;
    font-size: 24px;
    font-weight: bold;
  }
  .record-wrapper {
    margin-top: 12px;
    padding-bottom: 66px;
    height: calc(100vh - 62px);
    overflow: scroll;
  }
  ::v-deep .van-cell {
    background-color: transparent;
  }
  ::v-deep .van-button--info {
    background-color: rgb(224 207 153);
    border: 0px solid #1989fa;
    color: black;
    font-weight: 900;
  }
}
</style>
