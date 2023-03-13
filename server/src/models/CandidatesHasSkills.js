import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../../config/mysql.js'
import Step from './Step.js'

export default class CandidatesHasSkills extends Sequelize.Model {}

CandidatesHasSkills.init(
  {
    candidate_id: {
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
    modelName: 'candidates_has_skills',
    freezeTableName: true,
  },
)
