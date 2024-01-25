'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Brand, {
        foreignKey: 'brands_id',
        as: 'brand'
      });
      Product.belongsTo(models.Product_categorie, {
        foreignKey: 'product_categories_id',
        as: 'categorie'
      })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING(100)
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount: {
      type: DataTypes.DECIMAL(10,3),
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    brands_id: {
      type: DataTypes.INTEGER,
    },
    product_categories_id: {
      type: DataTypes.INTEGER,
    }
  
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  });
  return Product;
};