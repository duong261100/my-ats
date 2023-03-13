import { DataTypes } from 'sequelize'
import Sequelize from 'sequelize'
import { sequelize } from '../../config/mysql.js'

const saltRounds = 5

export default class Employer extends Sequelize.Model {}
Employer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING(50),
    },
    staff_code: {
      type: DataTypes.STRING(10),
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'employer',
    freezeTableName: true,
    hooks: {
      beforeSave: async (employer, options) => {
        console.log('Before save: ')
        console.log(employer)
        if (employer.changed('password')) {
          const salt = bcrypt.genSaltSync(saltRounds)
          employer.password = await bcrypt.hash(employer.password, salt)
        }
      },
    },
    instanceMethods: {
      generateRefreshToken: async (employer) => {
        const refreshToken = jwt.sign({ email: employer.email }, process.env.REFRESH_TOKEN_SECRET)
        employer.refresh_token = refreshToken
        await employer.save()
        return refreshToken
      },

      generateAccessToken: async (employer) => {
        const accessToken = jwt.sign({ email: employer.email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '10m',
        })
        return accessToken
      },
    },
  },
)
