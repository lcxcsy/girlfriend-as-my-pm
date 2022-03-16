<template>
  <div id="container"></div>
</template>

<script>
window.mapInstance = null
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'BmMap',
  setup(props, { emit }) {
    const loadJScript = () => {
      return new Promise((resolve, reject) => {
        if (typeof window.BMap !== 'undefined') {
          resolve(window.BMap)
          return true
        }
        window.onBMapCallback = function () {
          resolve(window.BMap)
        }
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src =
          '//api.map.baidu.com/api?type=webgl&v=2.0&ak=FAcKnbIiHn82T2n0Y3itGv3ESNVcmOzv&callback=onBMapCallback'
        document.body.appendChild(script)
        script.onerror = reject
      })
    }

    const initMap = () => {
      mapInstance = new window.BMapGL.Map('container') // 创建Map实例
      const point = new window.BMapGL.Point(116.404, 39.915) // 创建点坐标
      mapInstance.centerAndZoom(point, 17)
      mapInstance.enableScrollWheelZoom() // 启用滚轮放大缩小
      emit('ready', { mapInstance })
    }

    loadJScript().then(() => {
      initMap()
    })
  }
})
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
