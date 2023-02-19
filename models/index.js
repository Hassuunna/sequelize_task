import { readdirSync } from 'fs'
import { basename } from 'path'
import Sequelize from 'sequelize'
const env = process.env.NODE_ENV || 'development'
import allConfig from '../config/config.json' assert { type: "json" }
const config = allConfig[env]

const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

let files = readdirSync(new URL('./', import.meta.url)).filter(file =>
  file.indexOf('.') !== 0 &&
  file !== basename(import.meta.url) &&
  file.slice(-3) === '.js' &&
  file.indexOf('.test.js') === -1
).map(file => `./${file}`)

for (const file of files) {
  const module = await import(file)
  const model = module.default(sequelize, Sequelize)
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
