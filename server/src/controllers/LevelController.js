import Level from '../models/Level.js'

export const getAllLevels = async (req, res, next) => {
  try {
    const levels = await Level.findAll()
    res.status(200).json(levels)
  } catch (error) {
    res.send(error)
  }
  return
}

export const createLevel = async (req, res, next) => {
  try {
    const level = await Level.create(req.body.data)
    res.status(200).json(level)
  } catch (error) {
    res.send(error)
  }
  return
}
