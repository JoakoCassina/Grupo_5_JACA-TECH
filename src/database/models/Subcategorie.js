'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subcategorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subcategorie.belongsTo(models.Product_categories, {
        foreignKey: 'product_categories_id',
        as: 'categorie'
      });
      
    }
  }
  Subcategorie.init({
    name: DataTypes.STRING,
    product_categories_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subcategorie',
    timestamps: false,
    tableName: 'subcategories'
  });
  return Subcategorie;
};