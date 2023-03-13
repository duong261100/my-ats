import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../../config/mysql.js'

export default class JobsRequireSkills extends Sequelize.Model {}

JobsRequireSkills.init(
  {
    job_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    skill_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'jobs_require_skills',
    freezeTableName: true,
  },
)
