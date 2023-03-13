import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../../config/mysql.js'

export default class Status extends Sequelize.Model {}
Status.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'status',
    freezeTableName: true,
  },
)
