import axios from 'axios'

export default class API {
  static async getAllStatuses() {
    const res = await axios.get('/statuses')
    return res.data
  }
}
