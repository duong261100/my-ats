import { DataTypes, Sequelize } from 'sequelize'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sequelize } from '../../config/mysql.js'
import Experience from './Experience.js'
import Resume from './Resume.js'
import CandidatesHasSkills from './CandidatesHasSkills.js'
import Skill from './Skill.js'

const saltRounds = 5

export default class Candidate extends Sequelize.Model {}

Candidate.init(
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
    cv_url: {
      type: DataTypes.TEXT,
    },
    avatar_url: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
    },
    phone_number: {
      type: DataTypes.STRING(50),
    },
    birthday: {
      type: DataTypes.DATE,
    },
    summary: {
      type: DataTypes.TEXT,
    },
    hobby: {
      type: DataTypes.TEXT,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    is_activate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'candidate',
    freezeTableName: true,
    hooks: {
      beforeSave: async (candidate, options) => {
        console.log('Before save: ')
        console.log(candidate)
        if (candidate.changed('password')) {
          const salt = bcrypt.genSaltSync(saltRounds)
          candidate.password = await bcrypt.hash(candidate.password, salt)
        }
      },
    },
    instanceMethods: {
      generateRefreshToken: async (candidate) => {
        const refreshToken = jwt.sign({ email: candidate.email }, process.env.REFRESH_TOKEN_SECRET)
        candidate.refresh_token = refreshToken
        await candidate.save()
        return refreshToken
      },

      generateAccessToken: async (candidate) => {
        const accessToken = jwt.sign({ email: candidate.email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '10d',
        })
        return accessToken
      },
    },
  },
)

Candidate.hasMany(Experience, {
  foreignKey: 'candidate_id'
})

Candidate.hasMany(Resume, {
  foreignKey: 'candidate_id'
})

Candidate.belongsToMany(Skill, { through: CandidatesHasSkills, foreignKey: 'candidate_id', timestamps: false })
Skill.belongsToMany(Candidate, { through: CandidatesHasSkills, foreignKey: 'skill_id', timestamps: false })