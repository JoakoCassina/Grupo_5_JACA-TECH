'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.User, {
        foreignKey: 'roles_id',
        as: 'user'
      });
    }
  }
  Role.init({
    name: DataTypes.STRING(100)
  }, {
    sequelize,
    modelName: 'Role',
    timestamps: false,
    tableName: 'roles'
  });
  return Role;
};