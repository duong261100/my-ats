import { DataTypes } from 'sequelize'
import Sequelize from 'sequelize'
import { sequelize } from '../../config/mysql.js'

export default class Experience extends Sequelize.Model {}
Experience.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    candidate_id: {
      type: DataTypes.INTEGER
    },
    company_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    date_start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'experience',
    freezeTableName: true,
  },
)
