import Step from '../models/Step.js'

export const getAllSteps = async (req, res, next) => {
  try {
    const steps = await Step.findAll()
    res.status(200).json(steps)
  } catch (error) {
    res.send(error)
  }
  return
}

export const createStep = async (req, res, next) => {
  try {
    const step = await Step.create(req.body.data)
    res.status(200).json(step)
  } catch (error) {
    res.send(error)
  }
  return
}
