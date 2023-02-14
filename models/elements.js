'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class elements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  elements.init({
    element_name: DataTypes.STRING,
    parent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'elements',
  });
  return elements;
};