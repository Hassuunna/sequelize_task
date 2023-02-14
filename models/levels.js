'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class levels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      levels.belongsTo(models.data_objects, {
        foreignKey: 'data_objectId',
        onDelete: 'CASCADE'
      })
      levels.hasMany(models.elements, {
        foreignKey: 'levelId',
      })
    }
  }
  levels.init({
    level_name: DataTypes.STRING,
    level_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'levels',
  });
  return levels;
};