import Resume from '../models/Resume.js'
import Candidate from '../models/Candidate.js'
import { Op } from 'sequelize'

export const saveResume = async (req, res, next) => {
  const content = JSON.stringify(req.body)
  try {
    const resume = await Resume.findByPk(req.params.id)
    if (!resume) {
      const newResume = await Resume.create({ content: content, id: req.params.id })
      return res.status(200).json(newResume)
    } else {
      const upadteResume = await Resume.update(
        { content: content },
        {
          where: {
            id: req.params.id,
          },
        },
      )
      return res.status(200).json(upadteResume)
    }
  } catch (error) {
    res.send(error)
  }
  return
}

export const loadResume = async (req, res, next) => {
  try {
    const resume = await Resume.findByPk(req.params.id)
    res.status(200).json(JSON.parse(resume.content))
  } catch (error) {
    res.send(error)
  }
  return
}

export const getResumes = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByPk(req.params.id, {
      subQuery: false,
      include: { model: Resume },
    })
    const resumeIds = candidate.resumes.map((resume) => resume.id)
    const resumes = await Resume.findAll({
      where: {
        id: {
          [Op.in]: resumeIds,
        },
      },
    })
    res.status(200).json(resumes)
  } catch (error) {
    res.send(error)
  }
  return
}
