import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../../config/mysql.js'

export default class ProceduresHaveSteps extends Sequelize.Model {}

ProceduresHaveSteps.init(
  {
    procedure_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    step_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'procedures_has_steps',
    freezeTableName: true,
  },
)
