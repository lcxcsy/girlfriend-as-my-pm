<template>
  <div class="page-wrapper">
    <van-empty image="error" :description="errorText[code]" />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'Error',
  setup(props, { root }) {
    const router = root._router
    const code = router.params.type
    const errorText = {
      403: '您无权访问该页面',
      404: '您访问的页面不存在',
      500: '服务器异常，请联系管理员'
    }

    return { code, errorText }
  }
})
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  height: 100vh;
  padding-top: 160px;
}
</style>
