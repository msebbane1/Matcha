'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'verificationLink', {
      type: Sequelize.UUID,
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'verified', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'verificationLink');
    await queryInterface.removeColumn('Users', 'verified');
  }
};

