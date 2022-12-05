import dotenv from 'dotenv'

dotenv.config()

const MYSQLHOST = process.env.MYSQLHOST || 'localhost'
const MYSQLDATABASE = process.env.MYSQLDATABASE || 'book_store'
const MYSQLUSER = process.env.MYSQLUSER || 'root'
const MYSQLPASSWORD = process.env.MYSQLPASSWORD || 'duong123'

const MYSQL = {
  host: MYSQLHOST,
  database: MYSQLDATABASE,
  user: MYSQLUSER,
  password: MYSQLPASSWORD,
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const MYSQLPORT = process.env.MYSQLPORT || 3001

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: MYSQLPORT,
}

export default {
  mysql: MYSQL,
  server: SERVER,
}
