import Sequelize from 'sequelize'
import config from './config.js'
// import Candidate from '../src/models/Model.js'

export const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: 'mysql',
  host: config.mysql.host,
  port: config.server.port,
  username: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  logging: true,
  // models: [Candidate],
})