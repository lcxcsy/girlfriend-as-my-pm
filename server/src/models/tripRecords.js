import db from '../config/db.config'
import Sequelize from 'sequelize'
const { UUID, UUIDV4, INTEGER, DATE, STRING } = Sequelize

const recordModel = db.define(
  'trip_records', // 数据库对应的表
  {
    recordId: {
      unique: true,
      type: UUID,
      field: 'record_id',
      primaryKey: true, // 主键
      defaultValue: UUIDV4
    },
    userName: {
      type: STRING(16),
      field: 'user_name',
    },
    userId: {
      type: STRING(16),
      field: 'user_id',
    },
    areaName: {
      type: STRING(32),
      field: 'area_name',
    },
    startTime: {
      type: STRING(32),
      field: 'start_time',
    },
    endTime: {
      type: STRING(32),
      field: 'end_time',
    },
    reason: STRING(50),
    status: INTEGER('tiny'),
    createdAt: {
      type: DATE,
      field: 'created_at',
      comment: '创建时间'
    },
    updatedAt: {
      type: DATE,
      field: 'updated_at',
      comment: '更新时间'
    }
  },
  {
    timestamps: true
  }
)

export default recordModel