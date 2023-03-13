import candidateRouter from './candidate.js'
import jobRouter from './job.js'
import candidatesApplyJobsRouter from './candidates_apply_jobs.js'
import skillRouter from './skill.js'
import statusRouter from './status.js'
import stepRouter from './step.js'
import levelRouter from './level.js'
import procedureRouter from './procedure.js'
import resumeRouter from './resumes.js'
import sessionRouter from './session.js'

function router(app) {
  app.get('/', (req, res) => res.send('Welcome to server'))
  app.use('/candidates', candidateRouter)
  app.use('/jobs', jobRouter)
  app.use('/candidates-apply-jobs', candidatesApplyJobsRouter)
  app.use('/statuses', statusRouter)
  app.use('/steps', stepRouter)
  app.use('/skills', skillRouter)
  app.use('/levels', levelRouter)
  app.use('/procedures', procedureRouter)
  app.use('/resumes', resumeRouter)
  app.use('/session', sessionRouter)
}

export default router
