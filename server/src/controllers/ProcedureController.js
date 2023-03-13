import Procedure from '../models/Procedure.js'
import Step from '../models/Step.js'
import ProceduresHaveSteps from '../models/ProceduresHaveSteps.js'

export const getAllProcedures = async (req, res, next) => {
  try {
    const procedures = await Procedure.findAll()
    res.status(200).json(procedures)
  } catch (error) {
    res.send(error)
  }
  return
}

export const createProcedure = async (req, res, next) => {
  try {
    const procedure = await Procedure.create({
      name: req.body.name,
      description: req.body.description,
    })
    const stepIds = req.body.stepIds
    for (let i = 0; i < stepIds.length; i++) {
      await ProceduresHaveSteps.create({
        procedure_id: procedure.id,
        step_id: stepIds[i],
      })
    }

    res.status(200).json(procedure)
  } catch (error) {
    res.send(error)
  }
  return
}

export const getProcedureById = async (req, res, next) => {
  try {
    const procedure = await Procedure.findByPk(req.params.id, {
      include: [{ model: Step }],
    })
    res.status(200).json(procedure)
  } catch (error) {
    res.send(error)
  }
  return
}
