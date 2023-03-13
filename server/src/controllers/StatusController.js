import Status from '../models/Status.js'

export const getAllStatus = async (req, res, next) => {
  try {
    const statuses = await Status.findAll()
    if (!statuses) {
      return res.status(404).send('Status not found')
    }
    res.status(200).json(statuses)
  } catch (error) {
    res.send(error)
  }
  return
}
