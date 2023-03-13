import { DataTypes } from 'sequelize'
import Sequelize from 'sequelize'
import { sequelize } from '../../config/mysql.js'

export default class Skill extends Sequelize.Model {}
Skill.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'skill',
    freezeTableName: true,
  },
)
