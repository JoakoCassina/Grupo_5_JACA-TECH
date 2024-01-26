'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('subcategories', [
      { name: 'Smart TV'},
      { name: 'LED' },
      { name: 'Celulares' },
      { name: 'Aire acondicionado' },
      { name: 'Ventiladores' },
      { name: 'Parlantes' },
      { name: 'Microondas' },
      { name: 'Licuadoras' },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('subcategories', null, {});
  }
};
