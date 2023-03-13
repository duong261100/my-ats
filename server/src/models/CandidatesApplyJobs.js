import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../../config/mysql.js'
import Step from './Step.js'
import Candidate from './Candidate.js'

export default class CandidatesApplyJobs extends Sequelize.Model {}

CandidatesApplyJobs.init(
  {
    candidate_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    job_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    step_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    point: {
      type: DataTypes.INTEGER,
    },
    note: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'candidates_apply_jobs',
    freezeTableName: true,
  },
)

CandidatesApplyJobs.belongsTo(Step, {
  foreignKey: 'step_id',
  targetKey: 'id',
})

CandidatesApplyJobs.belongsTo(Candidate, {
  foreignKey: 'candidate_id',
  targetKey: 'id',
})
