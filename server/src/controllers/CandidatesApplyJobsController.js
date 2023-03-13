import CandidatesApplyJob from '../models/CandidatesApplyJobs.js'
import Step from '../models/Step.js'
import Candidate from '../models/Candidate.js'
import Job from '../models/Job.js'
import Procedure from '../models/Procedure.js'

export const getAllCandidatesApplyJobs = async (req, res, next) => {
  const statusId = req.query.statusId
  const stepId = req.query.stepId
  const filter = {}
  if (statusId && statusId != 0) filter.status_id = statusId
  if (stepId && stepId != 0) filter.id = stepId
  try {
    const cajs = await CandidatesApplyJob.findAll({
      include: [
        {
          model: Step,
          where: filter,
        },
        {
          model: Candidate,
        },
      ],
      order: [['createdAt', 'DESC']],
    })
    res.status(200).json(cajs)
  } catch (error) {
    res.send(error)
  }
  return
}

export const updateCaj = async (req, res, next) => {
  const data = req.body
  try {
    const caj = await CandidatesApplyJob.update(
      { point: data.point, note: data.note },
      {
        where: { candidate_id: data.candidate_id, job_id: data.job_id },
      },
    )
    res.status(200).json(caj)
  } catch (error) {
    res.send(error)
  }
  return
}

export const getCandidatesApplyJobByJobId = async (req, res, next) => {
  const statusId = req.query.statusId
  const filter = {}
  if (statusId) filter.status_id = statusId
  try {
    const findCAJ = await CandidatesApplyJob.findAll({
      where: { job_id: req.params.id },
      include: [
        {
          model: Step,
          where: filter,
        },
        {
          model: Candidate,
        },
      ],
    })
    return res.status(200).send(findCAJ)
  } catch (error) {
    return res.status(400).send(error)
  }
}

export const getCandidatesApplyJobByCandidateId = async (req, res, next) => {
  const candidateId = req.params.candidateId
  try {
    const findCAJs = await CandidatesApplyJob.findAll({
      where: { candidate_id: +candidateId },
      include: [
        {
          model: Step,
        },
      ],
    })

    return res.status(200).send(findCAJs)
  } catch (error) {
    return res.status(400).send(error)
  }
}

export const deleteCandidateApplyJob = async (req, res, next) => {
  try {
    const job_id = req.params.job_id
    const candidate_id = req.params.candidate_id
    const caj = await CandidatesApplyJob.destroy({
      where: { job_id, candidate_id },
    })
    res.status(203).json(caj)
  } catch (error) {
    res.send(error)
  }
  return
}

export const addCandidateApplyJob = async (req, res, next) => {
  const data = req.body

  const job = await Job.findByPk(data.job_id)
  const procedure = await Procedure.findByPk(job.procedure_id, {
    include: [{ model: Step }],
  })

  const step = procedure.steps.find((step) => step.status_id > -1)

  data.step_id = step.id
  try {
    const caj = await CandidatesApplyJob.create(data)
    res.status(200).json(caj)
  } catch (error) {
    res.send(error)
  }
  return
}

export const moveCandidateToStep = async (req, res, next) => {
  const data = req.body.data
  if (!data.step_id) {
    const job = await Job.findByPk(data.job_id)
    const procedure = await Procedure.findByPk(job.procedure_id, {
      include: [{ model: Step }],
    })

    const step = procedure.steps.find((step) => step.status_id > 1)

    data.step_id = step.id
  }

  try {
    const findCAJ = await CandidatesApplyJob.update(
      { step_id: req.body.data.step_id },
      {
        where: { candidate_id: req.body.data.candidate_id, job_id: req.body.data.job_id },
      },
    )
    return res.status(200).send(findCAJ)
  } catch (error) {
    return res.status(400).send(error)
  }
}

export const checkApply = async (req, res, next) => {
  const candidateId = req.params.candidateId
  try {
    const findCAJ = await CandidatesApplyJob.findAll({
      where: { candidate_id: candidateId },
    })
    if (findCAJ.length) return res.status(200).send(true)
    else return res.status(200).send(false)
  } catch (error) {
    return res.status(400).send(error)
  }
}
