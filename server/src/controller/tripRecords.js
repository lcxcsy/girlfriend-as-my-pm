import Sequelize from 'sequelize'
import RecordsModel from '../models/tripRecords'

const Op = Sequelize.Op

export default class RecordsController {

  async create(params) {
    params.status = 1 // 默认未审批
    return await RecordsModel.create(params)
  }

  async delete(recordId) {
    return await RecordsModel.destroy({
      where: { recordId: recordId }
    })
  }

  async update(params) {
    const { recordId } = params
    delete params.recordId
    return await RecordsModel.update(params, {
      where: { recordId: recordId }
    })
  }

  async query(params) {
    const { userId, status } = params
    const queryParams = userId
      ? { userId: userId, status: status }
      : { status: status }
    return await RecordsModel.findAll({
      where: queryParams,
      order: [["createdAt", "DESC"]]
    })
  }

  async export({ startTime, endTime }) {
    const data = await RecordsModel.findAll({
      where: {
        [Op.and]: [{
          startTime: {
            [Op.between]: [startTime, endTime]
          }
        }]
      }
    })

    const formatData = data
      .map(record => record.dataValues)
      .map(item => {
        item.statusName = item.status === 3 ? '审批完成' : item.status === 2 ? '已拒绝' : '未审批'
        let arr = []
        for (const key in item) {
          const includeKey = !['recordId', 'greatLifeKey', 'status'].includes(key)
          includeKey && arr.push(item[key])
        }
        return arr
      })

    formatData.unshift([
      '人员姓名',
      '出差地点',
      '开始日期',
      '结束日期',
      '出差事由',
      '申请时间',
      '当前状态'])

    return formatData
  }
}