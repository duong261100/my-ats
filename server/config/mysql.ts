import { Sequelize } from 'sequelize-typescript'
import config from './config'
import {
  Author,
  Book,
  BookCategory,
  Category,
  Language,
  Order,
  OrderDetail,
  Publisher,
  Rating,
  Status,
  User,
} from '../src/models/Model'

export const sequelize = new Sequelize(process.env.MYSQL_URL as string, {
  dialect: 'mysql',
  host: config.mysql.host,
  port: config.server.port as number,
  username: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  logging: false,
  models: [Author, Book, BookCategory, Category, Language, Order, OrderDetail, Publisher, Rating, Status, User],
})
