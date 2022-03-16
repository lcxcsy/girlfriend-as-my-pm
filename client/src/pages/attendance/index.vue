<template>
  <div
    v-title
    data-title="渠道经理考勤系统"
    :class="{ 'map-wrapper': true, 'empty-state': !withinTimeRange }"
  >
    <template v-if="withinTimeRange">
      <van-field v-model="location" left-icon="location-o" label="当前位置" readonly />
      <div class="map-container">
        <BmMap @ready="handleMapReady" />
      </div>
      <van-field
        :maxlength="12"
        label="姓名"
        readonly
        left-icon="user-o"
        placeholder="请选择"
        :value="currentUser.userName"
        :rules="[{ required: true }]"
        @click="showUserPicker = true"
      />
      <van-field
        v-model="noteMessage"
        rows="2"
        left-icon="chat-o"
        autosize
        required
        label="备注信息"
        type="textarea"
        maxlength="50"
        placeholder="请说明现所在渠道机构"
        show-word-limit
      />
      <van-field name="uploader" label="考勤照片" left-icon="upgrade" required>
        <template #input>
          <van-uploader
            v-model="uploadPicList"
            capture="camera"
            :after-read="afterRead"
            :max-count="1"
            @delete="handleDeleteImage"
          >
          </van-uploader>
        </template>
      </van-field>
      <div style="margin: 16px 100px">
        <van-button
          type="primary"
          :loading="submitLoading"
          loading-text="正在打卡，请稍候..."
          round
          block
          :disabled="isSuccess"
          @click="handleSubmit"
          >{{ isSuccess ? '打卡成功!' : '打卡' }}</van-button
        >
      </div>
    </template>
    <van-empty
      v-else
      :image="require('@/assets/images/empty-boy.png')"
      description="侠哥儿提醒您：当前时间不在打卡范围内，请在 09:10 之前及 16:00~24:00 之间进行打卡哟~"
    />
  </div>
</template>

<script>
import { Dialog } from 'vant'
import * as api from '@/api/index'
import BmMap from '@/components/BmMap'
import { useMap } from '@/hooks/useMap'
import { isDuringDate } from '@/utils/index'
import { defineComponent, ref, toRefs, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'Attendance',
  components: { BmMap },
  setup(props, { root }) {
    const withinTimeRange = computed(() => {
      return isDuringDate('00:00:00', '09:10:00') || isDuringDate('16:00:00', '24:00:00')
    })

    // 地图相关操作
    const { mapData, getLocation } = useMap()
    const handleMapReady = () => {
      getLocation()
    }

    const noteMessage = ref('')
    const uploadPicList = ref([])
    const serverImageUrl = ref('')
    const submitLoading = ref(false)
    const isSuccess = ref(false)
    const currentUser = root.$store.getters.userInfo

    const afterRead = (file) => {
      file.status = 'uploading'
      file.message = '上传中...'
      uploadImage(file)
    }

    // 上传图片
    const uploadImage = async (file) => {
      try {
        let formData = new FormData()
        //此处文件名必须为 pic ，因为后台设置仅接口此文件名
        formData.append('pic', file.file)
        const { data } = await api.uploadImage(formData)
        file.status = 'success'
        file.message = ''
        serverImageUrl.value = data
      } catch (err) {
        file.status = 'failed'
        file.message = '上传失败, 请重新上传'
      }
    }

    const handleDeleteImage = () => {
      uploadPicList.value = []
      serverImageUrl.value = ''
    }

    const handleSubmit = async () => {
      if (!noteMessage.value) {
        Dialog.alert({ message: '请填写所在机构！' })
        return
      }
      if (!serverImageUrl.value) {
        Dialog.alert({ message: '请先上传考勤照片！' })
        return
      }
      const params = {
        faceUrl: serverImageUrl.value,
        userName: currentUser.userName,
        userId: currentUser.userId,
        location: mapData.location,
        center: JSON.stringify(mapData.center),
        message: noteMessage.value
      }
      try {
        submitLoading.value = true
        await api.createAttendRecord(params)
        submitLoading.value = false
        Dialog.alert({ message: '打卡成功！' }).then(() => {
          isSuccess.value = true
        })
      } catch (err) {
        submitLoading.value = false
      }
    }

    return {
      currentUser,
      withinTimeRange,
      ...toRefs(mapData),
      handleMapReady,
      noteMessage,
      afterRead,
      uploadPicList,
      handleDeleteImage,
      handleSubmit,
      submitLoading,
      isSuccess
    }
  }
})
</script>

<style lang="scss" scoped>
.map-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  &.empty-state {
    @include flex-center;
  }
  .map-container {
    width: 100%;
    height: 40vh;
    padding: 0px 12px;
    margin: 12px 0px;
  }
}
// 去除版权声明
::v-deep .BMap_cpyCtrl {
  display: none;
}
::v-deep .van-field__label {
  font-weight: 900;
}
::v-deep .van-cell:not(:first-child) {
  padding: 10px 24px;
  width: calc(100% - 24px);
}
::v-deep .van-cell--required::before {
  left: 14px;
}
::v-deep .van-empty__image {
  height: 300px;
}
::v-deep .van-empty__description {
  text-align: center;
}
</style>
