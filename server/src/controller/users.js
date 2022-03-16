import UsersModel from '../models/users'

export default class UsersController {

  async create(params) {
    return await UsersModel.create(params)
  }

  async delete(uuid) {
    const user = await UsersModel.findByPk(uuid)
    if (!user) {
      throw new Error('user not found')
    }
    return user.destroy()
  }

  // 更新用户信息
  async update(params) {
    const { uuid } = params
    const user = await UsersModel.findByPk(uuid)
    if (!user) {
      throw new Error('user not found')
    }
    return user.update(params)
  }

  async query(params) {
    return await UsersModel.findAll({ where: params })
  }
}