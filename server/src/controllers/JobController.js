import Job from '../models/Job.js'
import Level from '../models/Level.js'
import Procedure from '../models/Procedure.js'
import Skill from '../models/Skill.js'
import Candidate from '../models/Candidate.js'
import JobsRequireSkills from '../models/JobsRequireSkills.js'
import { Op } from 'sequelize'

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.findAll({
      include: [{ model: Level }, { model: Procedure }, { model: Skill }, { model: Candidate }],
    })
    if (!jobs) {
      return res.status(404).send('Jobs not found')
    }
    res.status(200).json(jobs)
  } catch (error) {
    res.send(error)
  }
  return
}

export const getJobById = async (req, res, next) => {
  try {
    const findJob = await Job.findByPk(req.params.id, {
      include: [{ model: Level }, { model: Procedure }, { model: Skill }, { model: Candidate }],
    })
    if (!findJob) {
      return res.status(404).send('Job not found')
    }
    return res.status(200).send(findJob)
  } catch (error) {
    return res.status(400).send(error)
  }
}

export const searchJob = async (req, res, next) => {
  const searchData = req.body.data

  // Default values
  const allSkills = await Skill.findAll()
  const allSkillsId = allSkills.map((obj) => obj.id)
  const defaultSalaryRange = [0, 999999999]
  console.log(searchData.titleSearch)

  const jobSearchedFrom = await Job.findAll({
    where: {
      title: {
        [Op.like]: `%${searchData.titleSearch || ''}%`,
      },
      salary_from: {
        [Op.between]: searchData.salaryRange || defaultSalaryRange,
      },
      province: {
        [Op.like]: `%${searchData.province || ''}%`,
      },
      level_id: {
        [Op.like]: `%${searchData.levelId || ''}%`,
      },
    },
    include: [
      {
        model: Skill,
        where: {
          id: {
            [Op.in]: searchData.skillsSelectedId || allSkillsId,
          },
        },
      },
      { model: Level },
    ],
  })
  return res.status(200).json(jobSearchedFrom)
}

export const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      procedure_id: req.body.procedureId,
      level_id: req.body.levelId,
      number_hiring: req.body.numberHiring,
      address: req.body.address,
      province: req.body.province,
      salary_from: req.body.numberHiring,
      salary_to: req.body.numberHiring,
      date_from: new Date(),
      date_to: req.body.dateTo,
      requirement: req.body.requirement,
      description: req.body.description,
      benefit: req.body.benefit,
    })
    const skillIds = req.body.skillIds
    for (let i = 0; i < skillIds.length; i++) {
      await JobsRequireSkills.create({
        job_id: job.id,
        skill_id: skillIds[i],
      })
    }

    res.status(200).json(job)
  } catch (error) {
    res.send(error)
  }
  return
}
