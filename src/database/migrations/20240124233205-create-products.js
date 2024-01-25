'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      discount: {
        type: Sequelize.DECIMAL(10,3),
        allowNull: false
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      brands_id: {
        type: Sequelize.INTEGER,
          references: {
          model: 'brands',
          key: 'id'
        }
      },
      product_categories_id: {
        type: Sequelize.INTEGER,
          references: {
          model: 'product_categories',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};