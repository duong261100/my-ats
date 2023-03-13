import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { sequelize } from '../config/mysql.js'
import router from './routes/index.js'
import passport from 'passport'
import passportGoogleOauth20 from 'passport-google-oauth20'
const GoogleStrategy = passportGoogleOauth20.Strategy

dotenv.config()
const app = express()
app.use(cors({ credentials: true, origin: true }))

// const allowedOrigins = ['http://localhost:3000']
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true)
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
//         return callback(new Error(msg), false)
//       }
//       return callback(null, true)
//     },
//   }),
// )

// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'Content-Type')
//   next()
// })

passport.use(
  new GoogleStrategy(
    {
      clientID: '236295291039-dlbehv1uk3gplbndjnleg8pjetscpveu.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/auth/google/callback',
    },
    (accessToken) => {
      console.log(accessToken)
    },
  ),
)

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
)

app.get('/auth/google/callback', passport.authenticate('google'))

const host = process.env.SERVER_HOSTNAME || 'localhost'
const port = process.env.SERVER_PORT || 3001

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

router(app)

app.listen(port, () => {
  console.log(`🚀Server listening at http://${host}:${port}`)
  sequelize
    .authenticate()
    .then(() => console.log('Authenticated'))
    .catch((e) => console.log('Error: ', e))
})
