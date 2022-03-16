/*
 * @Author: 刘晨曦
 * @Date: 2021-09-06 18:23:51
 * @LastEditTime: 2022-03-15 17:44:58
 * @LastEditors: your name
 * @Description: POST请求修改为BodyParse的方式
 * @FilePath: \server\src\routes\users.js
 */
import express from 'express'
import Response from '../controller/response'
import UsersController from '../controller/users'
import { TokenUtil, AesCrypto } from '../utils'

const router = express.Router()
const response = new Response()
const tokenInstance = new TokenUtil()
const usersController = new UsersController()
const aesCrypto = new AesCrypto()

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('respond with a resource')
})

// 查询用户
router.get('/all', async (req, res) => {
  try {
    const data = await usersController.query(req.query)
    return res.json(response.createSuccessResponse(data))
  } catch (err) {
    return res.json(response.createCustomResponse('-1', err))
  }
})

// 新增用户
router.post('/create', async (req, res) => {
  try {
    const params = {
      ...req.body, password: aesCrypto.encrypt(req.body.userId, 'ccrs123456')
    }
    console.log(params, 'params');
    await usersController.create(params)
    return res.json(response.createSuccessResponse('用户创建成功'))
  } catch (err) {
    return res.json(response.createCustomResponse('-1', err))
  }
})

// 更新用户信息
router.post('/update', async (req, res) => {
  try {
    await usersController.update(req.body)
    return res.json(response.createSuccessResponse('更新成功！'))
  } catch (err) {
    return res.json(response.createCustomResponse('-1', err))
  }
})

router.get('/delete/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params
    await usersController.delete(uuid)
    return res.json(response.createSuccessResponse('删除成功'))
  } catch (err) {
    return res.json(response.createCustomResponse('-1', err))
  }
})

// 用户登录
router.post('/login', async (req, res) => {
  const data = await usersController.query(req.body)
  try {
    const userInfo = data[0]
    delete userInfo.password
    const token = await tokenInstance.sign(userInfo)
    return res.json(response.createSuccessResponse({ userInfo: userInfo, token }))
  } catch (err) {
    return res.json(response.createCustomResponse('-1', '用户名或密码错误'))
  }
})

// 登录认证
router.get('/cas', (req, res) => {
  if (req.data) {
    const userInfo = req.data
    return res.json(response.createSuccessResponse(userInfo))
  } else {
    return res.json(response.createCustomResponse('-1', 'no user information is obtained.'))
  }
})

export default router
