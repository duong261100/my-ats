import { DataTypes } from 'sequelize'
import Sequelize from 'sequelize'
import { sequelize } from '../../config/mysql.js'
// import Job from './Job.js'

export default class Level extends Sequelize.Model {}
Level.init(
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
    description: {
      type: DataTypes.TEXT,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'level',
    freezeTableName: true,
  },
)

// Level.hasMany(Job, {
//   foreignKey: 'level_id'
// })