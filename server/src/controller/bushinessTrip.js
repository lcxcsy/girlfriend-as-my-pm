import Sequelize from 'sequelize'
import RecordsModel from '../models/tripRecords'

const Op = Sequelize.Op

export default class RecordsController {

  async create (params) {
    params.status = 1 // 默认未审批
    return await RecordsModel.create(params)
  }

  async delete (recordId) {
    return await RecordsModel.destroy({
      where: { recordId: recordId }
    })
  }

  async update (params) {
    const { recordId } = params
    delete params.recordId
    return await RecordsModel.update(params, {
      where: { recordId: recordId }
    })
  }

  async query (params) {
    const { userId, status, startTime, endTime } = params
    let queryParams = {}
    queryParams.status = status

    if (userId) {
      queryParams.userId = userId
    }

    if (startTime && endTime) {
      queryParams = {
        [Op.and]: [{
          startTime: {
            [Op.between]: [startTime, endTime]
          }
        }]
      }
    }

    return await RecordsModel.findAll({
      where: queryParams,
      order: [["createdAt", "DESC"]]
    })
  }
}
