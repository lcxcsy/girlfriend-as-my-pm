<template>
  <div v-title data-title="江分经代OA系统" class="page-wrapper">
    <van-nav-bar left-arrow title="修改密码" @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="formData.password"
          type="password"
          label="新密码"
          maxlength="16"
          placeholder="请输入新密码"
          label-width="4rem"
          clearable
          :rules="[{ required: true, message: '新密码不能为空' }]"
        />
        <van-field
          v-model="formData.confirmPsd"
          type="password"
          label="确认密码"
          maxlength="16"
          placeholder="请再次输入密码"
          label-width="4rem"
          clearable
          :rules="[{ required: true, message: '确认密码不能为空' }]"
        />
        <p class="tip-title">
          注: 密码含8-16个字符，至少由大写字母、小写字母、数字、特殊字符任意两种组成
        </p>
      </van-cell-group>
      <div style="margin: 16px 100px">
        <van-button block round type="primary" :disabled="submitDisabled" native-type="submit"
          >确定</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import * as api from '@/api'
import { Toast } from 'vant'
import { aesEncrypt } from '@/utils'
import { validator } from '@/utils/validator'
import { defineComponent, reactive, computed } from '@vue/composition-api'
export default defineComponent({
  name: 'ChangePsd',
  setup(props, { root }) {
    const router = root._router
    const currentUser = root.$store.getters.userInfo
    const formData = reactive({ password: '', confirmPsd: '' })

    const checkPassword = (password) => {
      if (password.length > 0) {
        return validator.password.test(password)
      } else {
        return false
      }
    }

    const submitDisabled = computed(() => {
      const { password, confirmPsd } = formData
      if (password.length >= 1 && confirmPsd.length >= 1) {
        return false
      } else {
        return true
      }
    })

    const onClickLeft = () => {
      router.go(-1)
    }

    const onSubmit = async () => {
      const { password, confirmPsd } = formData
      if (!checkPassword(password) || !checkPassword(confirmPsd)) {
        Toast({ message: '请填写正确的密码格式', duration: 2000 })
        return
      }
      if (password !== confirmPsd) {
        Toast({ message: '前后两次密码填写不一致', duration: 2000 })
        return
      }
      Toast.loading({ duration: 0, forbidClick: true, message: '提交中...' })
      try {
        const params = {
          uuid: currentUser.uuid,
          password: aesEncrypt(currentUser.userId, password)
        }
        await api.updateUserInfo(params)
        Toast.clear()
        Toast.success('修改密码成功,请用新密码登录')
        router.push({ path: '/login' })
      } catch (err) {
        Toast.clear()
        Toast.success('修改失败，请重新修改')
      }
    }

    return {
      formData,
      submitDisabled,
      onClickLeft,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  height: 100vh;
  background-color: $main-bg-color;
  .tip-title {
    padding: 0px 14px;
    font-size: 12px;
  }
  ::v-deep .van-form {
    margin-top: 24px;
  }
}
</style>
