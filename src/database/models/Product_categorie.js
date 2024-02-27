'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_categorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product_categorie.hasMany(models.Subcategorie, {
        foreignKey: 'product_categories_id',
        as: 'subcategories'
      })
      Product_categorie.hasMany(models.Product, {
        foreignKey: 'product_categories_id',
        as: 'products'
      })
    }
  }
  Product_categorie.init({
    name: DataTypes.STRING(100),
  },
   {
    sequelize,
    modelName: 'Product_categorie',
    timestamps: false,
    tableName: 'product_categories'
  });
  return Product_categorie;
};