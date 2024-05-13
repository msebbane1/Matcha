'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'first_name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Users', 'last_name', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'first_name');
    await queryInterface.removeColumn('Users', 'last_name');
  }
};

