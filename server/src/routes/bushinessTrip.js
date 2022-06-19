import express from 'express'
import Response from '../controller/response'
import { commonExport } from "../utils/index"
import RecordsController from '../controller/bushinessTrip'

const router = express.Router()
const response = new Response()
const recordsController = new RecordsController()

router.post('/create', async (req, res) => {
  try {
    await recordsController.create(req.body)
    return res.json(response.createSuccessResponse('预约成功！'))
  } catch (err) {
    return res.json(response.createCustomResponse('-1', err))
  }
})

router.post('/query', async (req, res) => {
  try {
    const data = await recordsController.query(req.body)
    return res.json(response.createSuccessResponse(data))
  } catch (err) {
    return res.json(response.createCustomResponse('-1', err))
  }
})

router.post('/update', async (req, res) => {
  try {
    await recordsController.update(req.body)
    return res.json(response.createSuccessResponse('处理成功！'))
  } catch (err) {
    return res.json(response.createCustomResponse('-1', err))
  }
})

router.get('/export', async (req, res) => {
  const data = await recordsController.query(req.query)

  const file = commonExport(data, '出差申请', (data) => {
    const formatData = data.map(item => {
      item.statusName = item.status === 3 ? '审批完成' : item.status === 2 ? '已拒绝' : '未审批'
      let arr = []
      for (const key in item) {
        const includeKey = !['recordId', 'userId', 'status', 'updatedAt'].includes(key)
        includeKey && arr.push(item[key])
      }
      return arr
    });

    formatData.unshift(['人员姓名', '出差地点', '开始日期', '结束日期', '出差事由', '申请时间', '当前状态'])

    return formatData
  })

  res.download(file);
})


export default router
