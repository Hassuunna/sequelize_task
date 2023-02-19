import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class data_objects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      data_objects.hasMany(models.levels, {
        foreignKey: 'data_objectId',
      })
    }
  }
  data_objects.init({
    dataobject_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'data_objects',
  })
  return data_objects
}