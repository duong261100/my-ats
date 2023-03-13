import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../../config/mysql.js'
import Status from './Status.js'

export default class Step extends Sequelize.Model {}
Step.init(
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
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'step',
    freezeTableName: true,
  },
)

Step.belongsTo(Status, {
  foreignKey: 'status_id',
  targetKey: 'id',
})