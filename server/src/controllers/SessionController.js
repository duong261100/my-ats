import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Candidate from '../models/Candidate.js'
import Employer from '../models/Employer.js'

let tokenList = []

export const login = async (req, res) => {
  try {
    const user = await Candidate.findOne({ where: { email: req.body.email } })
    const employer = await Employer.findOne({ where: { email: req.body.email } })
    if (!user && !employer) {
      return res.status(401).send('Tên đăng nhập không tồn tại')
    }

    if (user) {
      const checkPassword = bcrypt.compareSync(req.body.password, user.password)
      if (!checkPassword) {
        return res.status(401).send('Mật khẩu không chính xác')
      }

      const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10d',
      })
      tokenList.push(accessToken)
      res.status(201).json({ user, accessToken })
    } else {
      const checkPassword = bcrypt.compareSync(req.body.password, employer.password)
      if (!checkPassword) {
        return res.status(401).send('Mật khẩu không chính xác')
      }

      const accessToken = jwt.sign({ email: employer.email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10d',
      })
      tokenList.push(accessToken)
      res.status(201).json({ user: employer, accessToken })
    }
  } catch (error) {
    console.log(error)
    res.send(error)
  }
  return
}

export const logout = async (req, res, next) => {
  const accessToken = req.header('Authorization')?.replace('Bearer ', '')
  tokenList = tokenList.filter((token) => token !== accessToken)
  res.sendStatus(204)
}

export const check = async (req, res, next) => {
  res.send('tokenList: ' + tokenList.length)
}

export const refreshToken = async (req, res) => {
  const { refresh_token } = req.body
  if (!refresh_token) return res.sendStatus(401)

  try {
    const data = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    })
    if (user) {
      const accessToken = await user.generateAccessToken(user)
      return res.status(201).json({ accessToken })
    } else {
      return res.status(400).json({ message: 'authen failed' })
    }
  } catch (error) {
    return res.send(error)
  }
}

export const register = async (req, res) => {
  try {
    const user = await Candidate.findOne({ where: { email: req.body.email } })
    if (user) {
      return res.status(401).send('Tên đăng nhập đã tồn tại')
    }

    const newUser = await Candidate.create(req.body)

    const accessToken = jwt.sign({ email: newUser.email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10d',
    })
    tokenList.push(accessToken)
    res.status(201).json({ newUser, accessToken })
  } catch (error) {
    res.send(error)
  }
  return
}
