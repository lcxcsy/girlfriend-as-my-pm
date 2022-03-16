import dayjs from 'dayjs'
import CryptoJS from 'crypto-js'
/**
 * @description: 时间格式化函数
 * @param {*} date
 * @param {*} type
 * @param {*} format
 * @return {*}
 */
export const customFormatTime = (date, type, format) => {
  if (!date) {
    return dayjs().format('YYYY/MM/DD hh:mm:ss')
  } else {
    switch (type) {
      case 'day':
        return dayjs(date).format('YYYY/MM/DD')
      case 'custom':
        return dayjs(date).format('YYYY/MM/DD ' + format)
      default:
        return dayjs(date).format('YYYY/MM/DD hh:mm:ss')
    }
  }
}

/**
 * @description: 判断某一时间是否在一段时间范围内
 * @param {*} beginDateStr
 * @param {*} endDateStr
 * @return {*}
 */
export const isDuringDate = (beginDateStr, endDateStr) => {
  return (
    dayjs().isAfter(dayjs().format(`YYYY-MM-DD ${beginDateStr}`)) &&
    dayjs().isBefore(dayjs().format(`YYYY-MM-DD ${endDateStr}`))
  )
}

/**
* @description: AES/ECB/PKCS5Padding 加密
* @param {*} userId
* @param {*} password
* @return {*} 加密后的密文
*/
export const aesEncrypt = (userId = '', password = '') => {
  try {
    const hash = CryptoJS.MD5(userId).toString().substring(0, 16) // 产生秘钥
    const key = CryptoJS.enc.Utf8.parse(hash)
    const message = CryptoJS.enc.Utf8.parse(password)
    const encrypted = CryptoJS.AES.encrypt(message, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  } catch (err) {
    return false
  }
}

/**
* @description: AES/ECB/PKCS5Padding 解密
* @param {*} userId
* @param {*} password
* @return {*} 解密后的明文
*/
export const aesDecrypt = (userId, password) => {
  try {
    const hash = CryptoJS.MD5(userId).toString().substring(0, 16) // 产生秘钥
    const key = CryptoJS.enc.Utf8.parse(hash)
    const decrypt = CryptoJS.AES.decrypt(password, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  } catch (err) {
    return false
  }
}

// 本地化存储
export const setLocalStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

// 本地化存储token
export const setSessionStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

// 本地化删除token
export const removeSessionStore = (name) => {
  if (!name) return
  return window.sessionStorage.removeItem(name)
}

// 本地化获取
export const getLocalStore = (name) => {
  if (!name) return
  return window.localStorage.getItem(name)
}
// 本地化删除
export const removeLocalStore = (name) => {
  if (!name) return
  return window.localStorage.removeItem(name)
}
