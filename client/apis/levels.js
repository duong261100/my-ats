import axios from 'axios'

export default class API {
  static async getAllLevels() {
    const res = await axios.get('/levels')
    return res.data
  }

  static async createLevel(level) {
    const res = await axios.post('/levels/create', {
      data: level,
    })
    return res.data
  }
}
