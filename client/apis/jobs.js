import axios from 'axios'
import CajAPI from './candidates_apply_jobs'

export default class API {
  static async getAllJobs() {
    const res = await axios.get('/jobs')
    const data = res.data
    for (let i = 0; i < data.length; i++) {
      const appliedCandidates = await CajAPI.getCandidatesApplyJobById(
        data[i].id,
        0
      )
      const interviewingCandidates = await CajAPI.getCandidatesApplyJobById(
        data[i].id,
        1
      )
      const offeringCandidates = await CajAPI.getCandidatesApplyJobById(
        data[i].id,
        2
      )
      const hiredCandidates = await CajAPI.getCandidatesApplyJobById(
        data[i].id,
        3
      )
      const rejectedCandidates = await CajAPI.getCandidatesApplyJobById(
        data[i].id,
        4
      )
      data[i].applied = appliedCandidates.length
      data[i].interviewing = interviewingCandidates.length
      data[i].offering = offeringCandidates.length
      data[i].hired = hiredCandidates.length
      data[i].rejected = rejectedCandidates.length
      data[i].total =
        data[i].applied +
        data[i].interviewing +
        data[i].offering +
        data[i].hired +
        data[i].rejected
    }
    return data
  }

  static async getJobById(id) {
    const res = await axios.get(`/jobs/${id}`)
    return res.data
  }

  static async searchJobs(searchData) {
    console.log(searchData)
    const res = await axios.post('/jobs/search', {
      data: searchData,
    })
    return res.data
  }
}
