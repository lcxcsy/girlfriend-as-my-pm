<!--
 * @Author: 刘晨曦
 * @Date: 2022-03-07 14:52:33
 * @LastEditTime: 2022-03-11 18:12:36
 * @LastEditors: your name
 * @Description: 用户登录模块
 * @FilePath: \client\src\pages\login\index.vue
-->
<template>
  <div v-title data-title="江分经代OA系统" class="page-wrapper">
    <van-form class="login-form" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="loginForm.userId"
          label="账号"
          left-icon="user-o"
          maxlength="32"
          placeholder="请输入账号"
          label-width="3rem"
          clearable
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="loginForm.password"
          type="password"
          label="密码"
          maxlength="16"
          left-icon="lock"
          placeholder="请输入密码"
          label-width="3rem"
          clearable
          :rules="[{ required: true }]"
        />
      </van-cell-group>
      <div style="margin: 24px">
        <van-button block round type="primary" :disabled="!validateSuccess" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <div class="copyright">
      Copyright ©2022 lcxcsy.top
      <a href="http://beian.miit.gov.cn/" target="_blank">苏ICP备2021056380号</a>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import * as api from '@/api'
import { aesEncrypt } from '@/utils'
import { defineComponent, reactive, computed } from '@vue/composition-api'
export default defineComponent({
  name: 'LoginPage',
  setup(props, { root }) {
    const router = root._router
    const getters = root.$store.getters
    const actions = root.$store._actions
    const loginForm = reactive({ userId: '', password: '' })
    const userInfo = getters.userInfo

    loginForm.userId = userInfo?.userId || ''

    const validateSuccess = computed(() => {
      const { userId, password } = loginForm
      if (userId.length >= 1 && password.length >= 1) {
        return true
      } else {
        return false
      }
    })

    const onSubmit = async () => {
      Toast.loading({
        duration: 0,
        forbidClick: true,
        message: '登录中...'
      })
      const params = {
        userId: loginForm.userId.trim(),
        password: aesEncrypt(loginForm.userId.trim(), loginForm.password.trim())
      }
      try {
        const { data } = await api.userLogin(params)
        actions.syncToken[0](data.token)
        actions.syncUserInfo[0](data.userInfo)
        Toast.success('登录成功')
        router.push({ path: '/home' })
      } catch (err) {
        Toast.fail('登录失败，用户名或密码错误')
      }
    }

    return {
      loginForm,
      validateSuccess,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  height: 100vh;
  padding-top: 200px;
  @include background-image('~@/assets/images/background.jpg');
  .login-form {
    padding: 12px;
    width: calc(100% - 24px);
  }
  ::v-deep .van-field__label {
    font-weight: bold;
  }
  .copyright {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 2rem;
    color: #999;
    font-size: 0.8rem;
    font-family: Arial, Helvetica, sans-serif;
    & a {
      color: #999;
      margin-left: 6px;
      text-decoration: none;
    }
  }
}
</style>
