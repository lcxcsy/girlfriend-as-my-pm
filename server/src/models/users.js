/*
 * @Author: 刘晨曦
 * @Date: 2021-09-06 18:23:51
 * @LastEditTime: 2022-03-15 17:25:12
 * @LastEditors: your name
 * @Description: 数据库映射关系
 * @FilePath: \server\src\models\users.js
 */
import db from '../config/db.config'
import Sequelize from 'sequelize'
const { UUID, UUIDV4, INTEGER, DATE, STRING } = Sequelize

// Object-Relational Mapping，把关系数据库的表结构映射到对象上。
const usersModel = db.define(
  'users', // 数据库对应的表
  {
    uuid: {
      type: UUID,
      unique: true,
      field: 'uuid',
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
    userType: {
      type: INTEGER('tiny'),
      field: 'user_type',
    },
    password: {
      type: STRING(32),
      field: 'password',
    },
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
    timestamps: true // Sequelize的自动添加timestamp的功能
  }
)

export default usersModel
