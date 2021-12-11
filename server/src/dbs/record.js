import db from '../db.config'
import Sequelize from 'sequelize'

const recordModel = db.define(
  'records', // 数据库对应的表
  {
    recordId: {
      type: Sequelize.STRING(36),
      primaryKey: true // 主键
    },
    personName: Sequelize.STRING(32),
    areaName: Sequelize.STRING(32),
    startTime: Sequelize.STRING(32),
    endTime: Sequelize.STRING(32),
    reason: Sequelize.STRING(100),
    status: Sequelize.INTEGER(1),
    greatLifeKey: Sequelize.STRING(32),
    createdTime: Sequelize.STRING(32)
  },
  {
    timestamps: false // 关闭Sequelize的自动添加timestamp的功能
  }
)

export default recordModel