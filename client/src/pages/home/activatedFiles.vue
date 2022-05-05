<!--
 * @Author: 刘晨曦
 * @Date: 2022-03-07 14:52:33
 * @LastEditTime: 2022-03-15 15:15:35
 * @LastEditors: your name
 * @Description: 常用文档
 * @FilePath: \client\src\pages\home\aboutMe.vue
-->
<template>
  <div v-title data-title="常用文档" class="detail-wrapper">
    <div class="menu-title">常用文档</div>
    <van-grid :gutter="10" :column-num="2">
      <van-grid-item
        v-for="(item, index) in ACTIVATED_DOCS"
        :key="index"
        icon="orders-o"
        :text="item.docsName"
        :url="item.router"
      />
    </van-grid>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { ACTIVATED_DOCS } from '@/config/constant'
export default defineComponent({
  name: 'ActivatedFiles',
  setup() {
    return { ACTIVATED_DOCS }
  },
})
</script>

<style lang="scss" scoped>
.detail-wrapper {
  width: 100%;
  height: 100vh;
  background-color: $main-bg-color;
  .menu-title {
    color: #26282a;
    font-weight: 700;
    font-size: 14px;
    padding: 8px 12px;
  }
}
</style>
