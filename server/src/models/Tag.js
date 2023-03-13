import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../../config/mysql.js'

export default class Tag extends Sequelize.Model {}
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'tag',
    freezeTableName: true,
  },
)
