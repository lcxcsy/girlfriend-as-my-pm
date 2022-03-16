import { Notify } from 'vant'
import { reactive } from '@vue/composition-api'

export const useMap = () => {
  const mapData = reactive({
    center: { lng: 116.404, lat: 39.915 },
    zoom: 15,
    location: ''
  })

  // 获取当前的经纬度坐标
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const { longitude, latitude } = data.coords
        mapData.center = {
          lng: longitude.toFixed(6),
          lat: latitude.toFixed(6)
        }
        convertWGS84ToBD(mapData.center)
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            Notify({ type: 'warning', message: '获取位置信息失败！请确保GPS正常开启' })
            break
          case error.POSITION_UNAVAILABLE:
            Notify({ type: 'warning', message: '位置信息不可用' })
            break
          case error.TIMEOUT:
            Notify({ type: 'warning', message: '请求用户地理位置超时' })
            break
          case error.UNKNOWN_ERROR:
            Notify({ type: 'warning', message: '未知错误' })
            break
        }
      }
    )
  }

  /**
   * @description: WGS84坐标系转为百度bd09经纬度坐标
   * @param {*} lng
   * @param {*} lat
   * @return {*}
   */
  const convertWGS84ToBD = ({ lng, lat }) => {
    const COORDINATES_WGS84 = 1
    const COORDINATES_BD09 = 5
    const convertor = new BMapGL.Convertor()
    const point = new BMapGL.Point(lng, lat)
    const pointArr = []
    pointArr.push(point)
    convertor.translate(pointArr, COORDINATES_WGS84, COORDINATES_BD09, translateCallback)
  }

  /**
   * @description: 坐标转换之后的回调
   * @param {*} data
   * @return {*}
   */
  const translateCallback = (data) => {
    if (data.status === 0) {
      data.points[0]
      getLocationName(data.points[0])
      createBmMarker(data.points[0])
      createBmCircle(data.points[0], 250)
      // searchNearbyInCircle(data.points[0], 250)
      mapInstance.setCenter(data.points[0])
    }
  }

  /**
   * @description: 根据经纬度获取当前所在地址
   * @param {*} lng
   * @param {*} lat
   * @return {*}
   */
  const getLocationName = ({ lng, lat }) => {
    const geocoder = new BMapGL.Geocoder()
    const point = new BMapGL.Point(lng, lat)
    geocoder.getLocation(point, (data) => {
      mapData.location = data.address
    })
  }

  /**
   * @description: 创建地图的点位
   * @param {*} lng
   * @param {*} lat
   * @return {*}
   */
  const createBmMarker = ({ lng, lat }) => {
    const marker = new BMapGL.Marker(new BMapGL.Point(lng, lat))
    mapInstance.addOverlay(marker)
  }

  /**
   * @description: 创建当前点位200米范围
   * @param {*} lng
   * @param {*} lat
   * @return {*}
   */
  const createBmCircle = ({ lng, lat }, radius) => {
    const circle = new BMapGL.Circle(new BMapGL.Point(lng, lat), radius, {
      fillColor: 'blue',
      strokeWeight: 1,
      fillOpacity: 0.3,
      strokeOpacity: 0.3
    })
    mapInstance.addOverlay(circle)
  }

  // const searchNearbyInCircle = ({ lng, lat }, radius) => {
  //   const localSearch = new BMapGL.LocalSearch(mapInstance, {
  //     renderOptions: {
  //       map: mapInstance,
  //       selectFirstResult: false,
  //       autoViewport: false
  //     }
  //   })
  //   const mPoint = new BMapGL.Point(lng, lat)
  //   localSearch.searchNearby('公司', mPoint, radius)
  // }

  return { mapData, getLocation }
}