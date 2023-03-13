import axios from 'axios'

export default class API {
  static async getAllSteps() {
    const res = await axios.get('/steps')
    return res.data
  }

  static async createStep(step) {
    const res = await axios.post('/steps/create', {
      data: step
    })
    return res.data
  }
}
