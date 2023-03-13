import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../../config/mysql.js'
import Step from './Step.js'

export default class Procedure extends Sequelize.Model {}
Procedure.init(
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
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'procedure',
    freezeTableName: true,
  },
)

Procedure.belongsToMany(Step, { through: 'procedures_has_steps', foreignKey: 'procedure_id', timestamps: false })
Step.belongsToMany(Procedure, { through: 'procedures_has_steps', foreignKey: 'step_id', timestamps: false })