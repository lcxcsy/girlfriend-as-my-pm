import { Router } from 'express'
import { commonUpload } from "../utils/index"
import Response from '../controller/response'

const router = Router()
const response = new Response()

router.post('/upload', commonUpload().single('pic'), async (req, res) => {
  try {
    const { path: filePath } = req.file
    if (filePath) {
      return res.json(response.createSuccessResponse(filePath))
    } else {
      return res.json(response.createCustomResponse('-1', '上传失败'))
    }
  } catch (err) {
    return res.json(response.createCustomResponse('-1', err))
  }
})

export default router