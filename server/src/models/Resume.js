import { DataTypes } from 'sequelize'
import Sequelize from 'sequelize'
import { sequelize } from '../../config/mysql.js'

export default class Resume extends Sequelize.Model {}
Resume.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    candidate_id: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'resume',
    freezeTableName: true,
  },
)
