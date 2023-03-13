import axios from 'axios'

export default class API {
  static async getAllProcedures() {
    const res = await axios.get('/procedures')
    return res.data
  }

  static async createProcedure(procedure) {
    const res = await axios.post('/procedures/create', {
      data: procedure,
    })
    return res.data
  }

  static async getProcedureById(id) {
    const res = await axios.get(`/procedures/${id}`)
    return res.data
  }
}
