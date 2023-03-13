import Skill from '../models/Skill.js'

export const getAllSkills = async (req, res, next) => {
  try {
    const skills = await Skill.findAll()
    res.status(200).json(skills)
  } catch (error) {
    res.send(error)
  }
  return
}

export const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body.data)
    res.status(200).json(skill)
  } catch (error) {
    res.send(error)
  }
  return
}
