import db from '../config/db.config'
import Sequelize from 'sequelize'
const { UUID, UUIDV4, DATE, STRING } = Sequelize

const attendRecordModel = db.define(
  'attend_records', // 数据库对应的表
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
    location: STRING(100),
    center: STRING(256),
    faceUrl: {
      type: STRING(256),
      field: 'face_url',
    },
    message: STRING(50),
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

export default attendRecordModel