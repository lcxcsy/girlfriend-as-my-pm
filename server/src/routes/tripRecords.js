import fs from 'fs'
import xlsx from 'node-xlsx'
import express from 'express'
import Response from '../controller/response'
import RecordsController from '../controller/tripRecords'

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
  const { startTime, endTime } = req.query
  const data = await recordsController.export({ startTime, endTime })
  const sheetOptions = {
    '!cols': [
      { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }
    ]
  }
  const buffer = xlsx.build([{ name: 'mySheetName', data: data }], { sheetOptions });
  const fileName = `出差申请记录.xlsx`
  fs.writeFileSync(fileName, buffer, { 'flag': 'w' });
  res.download(fileName);
})


export default router
