import axios from 'axios'

export default class API {
  static async getCandidateById(id) {
    const res = await axios.get(`/candidates/${id}`)
    return res.data
  }
}
