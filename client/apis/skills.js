import axios from 'axios'

export default class API {
  static async getAllSkills() {
    const res = await axios.get('/skills')
    return res.data
  }

  static async createSkill(skill) {
    const res = await axios.post('/skills/create', {
      data: skill,
    })
    return res.data
  }
}
