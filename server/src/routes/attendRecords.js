import dayjs from 'dayjs'
import express from 'express'
import { uploadImage } from "../utils/index"
import AttendRecordsController from '../controller/attendRecords'
import Response from '../controller/response'

const router = express.Router()
const response = new Response()
const attendRecordsController = new AttendRecordsController()

router.post('/records/upload', uploadImage().single('pic'), async (req, res) => {
  try {
    const filename = req.file.filename
    const currentDay = dayjs().format('YYYYMMDD')
    if (filename) {
      return res.json(response.createSuccessResponse(`/great-life/attend_images/${currentDay}/${filename}`))
    } else {
      return res.json(response.createCustomResponse('-1', '上传失败'))
    }
  } catch (err) {
    return res.json(response.createCustomResponse('-1', err))
  }
})

router.post('/records/create', uploadImage().single('pic'), async (req, res) => {
  try {
    await attendRecordsController.create(req.body)
    return res.json(response.createSuccessResponse('打卡成功！'))
  } catch (err) {
    return res.json(response.createCustomResponse('-1', err))
  }
})

router.post('/records/query', async (req, res) => {
  const data = await attendRecordsController.query(req.body)
  return res.json(response.createSuccessResponse(data))
})

router.get('/records/delete/:id', async (req, res) => {
  try {
    const { id } = req.params
    await attendRecordsController.delete(id)
    return res.json(response.createSuccessResponse('删除成功'))
  } catch (err) {
    return res.json(response.createCustomResponse('-1', err))
  }
})

export default router