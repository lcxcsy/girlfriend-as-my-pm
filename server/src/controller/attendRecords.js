import Sequelize from 'sequelize'
import AttendRecordsModel from '../models/attendRecords'

const Op = Sequelize.Op

export default class AttendRecordsController {

  async create(params) {
    return await AttendRecordsModel.create(params)
  }

  async delete(key) {
    return await AttendRecordsModel.destroy({
      where: { recordId: key }
    })
  }

  async update(params) {
    const { recordId } = params
    delete params.recordId
    return await AttendRecordsModel.update(...params, {
      where: { recordId: recordId }
    })
  }

  async query(params) {
    const { startTime, endTime, userId, userType } = params
    let queryParams = {
      [Op.and]: [{
        createdAt: {
          [Op.between]: [startTime, endTime]
        }
      }]
    }
    // 如果为普通用户的话，只能查询改用户的信息
    if (userType === 1) {
      queryParams.userId = [userId]
    }
    return await AttendRecordsModel.findAll({
      where: queryParams,
      order: [["createdAt", "DESC"]]
    })
  }
}