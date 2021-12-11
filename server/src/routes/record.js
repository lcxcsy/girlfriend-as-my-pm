import express from 'express'
import Record from '../dbs/record'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import Response from '../controller/response'

const router = express.Router()
const response = new Response()

router.post('/create', async (req, res, next) => {
  const params = req.body
  params.recordId = uuidv4()
  params.status = 1 // 默认未审批
  params.createdTime = dayjs().format('YYYY/MM/DD HH:mm:ss')
  await Record.create(params)
  return res.json(response.createSuccessResponse('预约成功！'))
})

router.post('/query', async (req, res, next) => {
  const { greatLifeKey, isAdmin, status } = req.body
  let data
  if (isAdmin) {
    data = await Record.findAll({
      where: {
        status: status
      }
    })
  } else {
    data = await Record.findAll({ where: { greatLifeKey, status: status } })
  }

  return res.json(response.createSuccessResponse(data))
})

router.post('/update', async (req, res, next) => {
  const { status, recordId } = req.body
  await Record.update({ status: status }, {
    where: {
      recordId: recordId
    }
  })
  return res.json(response.createSuccessResponse('处理成功！'))
})

export default router
