import Candidate from '../models/Candidate.js'
import Experience from '../models/Experience.js'

export const getAllCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.findAll({
      subQuery: false,
      include: { model: Experience },
    })
    // const candidates = await Experience.findAll({})
    if (!candidates) {
      return res.status(404).send('Candidates not found')
    }
    res.status(201).send(candidates)
  } catch (error) {
    res.send(error)
  }
  return
}

export const createCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.create(req.body.data)
    res.status(200).json(candidate)
  } catch (error) {
    res.send(error)
  }
  return
}

export const getCandidateById = async (req, res, next) => {
  try {
    const findCandidate = await Candidate.findByPk(req.params.id)
    if (!findCandidate) {
      return res.status(404).send('Candidate not found')
    }
    return res.status(200).send(findCandidate)
  } catch (error) {
    return res.status(400).send(error)
  }
}
