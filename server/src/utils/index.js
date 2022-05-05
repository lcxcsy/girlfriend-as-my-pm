/*
 * @Author: 刘晨曦
 * @Date: 2021-03-18 14:10:55
 * @LastEditTime: 2022-03-11 14:19:17
 * @LastEditors: your name
 * @Description: 通用函数
 * @FilePath: \server\src\utils\index.js
 */
import fs from 'fs'
import dayjs from 'dayjs'
import path from 'path'
import multer from 'multer'
import mkdirp from 'mkdirp'
import CryptoJS from 'crypto-js'
import jsonwebtoken from 'jsonwebtoken'

const rootPath = path.resolve(__dirname, '../..')
const publicKey = fs.readFileSync(path.join(rootPath, 'cert/lcxcsy.top.key'))

export class TokenUtil {
  /**
   * @description: jsonwebtoken 签名
   * @param {*} username
   * @param {*} userId
   * @return {*}
   */
  sign (userInfo) {
    return new Promise((resolve) => {
      const token = jsonwebtoken.sign({ ...userInfo }, publicKey, { expiresIn: '365 days', maxAge: '365 days' })
      resolve(`Bearer ${token}`)
    })
  }

  /**
   * @description: jsonwebtoken 认证
   * @param {*} token
   * @return {*}
   */
  verify (token) {
    return new Promise((resolve) => {
      const info = jsonwebtoken.verify(token.split(' ')[1], publicKey)
      resolve(info)
    })
  }
}

export class AesCrypto {
  /**
 * @description: AES/ECB/PKCS5Padding 加密
 * @param {*} name
 * @param {*} password
 * @return {*} 加密后的密文
 */
  encrypt (name = '', password = '') {
    try {
      const hash = CryptoJS.MD5(name).toString().substring(0, 16) // 产生秘钥
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
 * @param {*} name
 * @param {*} password
 * @return {*} 解密后的明文
 */
  decrypt (name, password) {
    try {
      const hash = CryptoJS.MD5(name).toString().substring(0, 16) // 产生秘钥
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
}

/**
 * @description: 上传图片
 * @param {*}
 * @return {*}
 */
export const uploadImage = () => {
  const storage = multer.diskStorage({
    // 指定上传后保存到哪一个文件夹中
    destination: async (req, file, callback) => {
      // 创建存储图片的目录
      const currentDay = dayjs().format('YYYYMMDD')
      fs.access(`./public/attend_images/${currentDay}`, async (err) => {
        // 如果不存在的话
        if (err) {
          await mkdirp(`./public/attend_images/${currentDay}`)
          callback(null, `public/attend_images/${currentDay}`)
        } else {
          callback(null, `public/attend_images/${currentDay}`)
        }
      })
    },
    // 给保存的文件命名，需要返回全称，包括后缀
    filename: (req, file, callback) => {
      const originalName = file.originalname
      const extname = path.extname(originalName); // 获取后缀名
      const fileName = path.parse(originalName).name // 获取上传的文件名
      callback(null, `${fileName}-${Date.now()}${extname}`)//加上时间，防止文件重名
    }
  })
  return multer({ storage })
}
