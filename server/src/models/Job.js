import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../../config/mysql.js'
import Level from './Level.js'
import Procedure from './Procedure.js'
import Skill from './Skill.js'
import Candidate from './Candidate.js'
import CandidatesApplyJobs from './CandidatesApplyJobs.js'

export default class Job extends Sequelize.Model {}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    procedure_id: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    level_id: {
      type: DataTypes.INTEGER,
    },
    number_hiring: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    salary_from: {
      type: DataTypes.INTEGER,
    },
    salary_to: {
      type: DataTypes.INTEGER,
    },
    date_to: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    requirement: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    benefit: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'job',
    freezeTableName: true,
  },
)

Job.belongsTo(Level, {
  foreignKey: 'level_id',
  targetKey: 'id',
})

Job.belongsTo(Procedure, {
  foreignKey: 'procedure_id',
  targetKey: 'id',
})

Job.belongsToMany(Skill, { through: 'jobs_require_skills', foreignKey: 'job_id', timestamps: false })
Skill.belongsToMany(Job, { through: 'jobs_require_skills', foreignKey: 'skill_id', timestamps: false })
Job.belongsToMany(Candidate, { through: CandidatesApplyJobs, foreignKey: 'job_id', timestamps: true })
Candidate.belongsToMany(Job, { through: CandidatesApplyJobs, foreignKey: 'candidate_id', timestamps: true })
