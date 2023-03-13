import dotenv from 'dotenv'

dotenv.config()

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost'
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'book_store'
const MYSQL_USER = process.env.MYSQL_USER || 'root'
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'duong123'

const MYSQL = {
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const MYSQL_PORT = process.env.MYSQL_PORT || 3001

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: MYSQL_PORT,
}

export default {
  mysql: MYSQL,
  server: SERVER,
}
