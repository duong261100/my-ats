import axios from 'axios'
import JobAPI from './jobs'

export default class API {
  static async getAllCajs(statusId, stepId) {
    const res = await axios.get('/candidates-apply-jobs', {
      params: {
        statusId,
        stepId,
      },
    })
    let cajs = res.data
    for (let i = 0; i < cajs.length; i++) {
      const job = await JobAPI.getJobById(cajs[i].job_id)
      cajs[i].job = job
    }

    return cajs
  }

  static async getCandidatesApplyJobById(id, status) {
    const res = await axios.get(`/candidates-apply-jobs/${id}`, {
      params: {
        status,
      },
    })
    let cajs = res.data
    cajs = cajs.map(async (caj) => {
      const job = await JobAPI.getJobById(caj.job_id)
      caj.job = job
      return caj
    })

    return cajs
  }

  static async getCandidatesApplyJobByCandidateId(id) {
    const res = await axios.get(`/candidates-apply-jobs/candidates/${id}`)
    console.log(res.data)
    let cajs = res.data
    for (let i = 0; i < cajs.length; i++) {
      const job = await JobAPI.getJobById(cajs[i].job_id)
      cajs[i].job = job
    }

    return cajs
  }

  static async rejectCandidateApplyJob(candidate_id, job_id) {
    const res = await axios.delete(
      `/candidates-apply-jobs/${job_id}/${candidate_id}`
    )

    return res
  }

  static async addCandidateApplyJob(candidate_id, job_id) {
    const res = await axios.post(`/candidates-apply-jobs`, {
      data: {
        candidate_id,
        job_id,
      },
    })

    return res
  }

  static async moveCandidateToStep(candidate_id, job_id, step_id) {
    const res = await axios.put(`/candidates-apply-jobs`, {
      data: {
        candidate_id,
        job_id,
        step_id,
      },
    })

    return res
  }
}
