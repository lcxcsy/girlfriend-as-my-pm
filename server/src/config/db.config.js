import Sequelize from 'sequelize'

const config = {
  host: 'localhost',
  username: 'root',
  password: 'liuchenxi0428@',
  database: 'great_life'
}

// Object-Relational Mapping，把关系数据库的表结构映射到对象上。
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})

export default sequelize
