'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const allowedTags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10'];

const generateRandomTags = () => {
  const randomTags = [];
  const shuffledTags = allowedTags.sort(() => 0.5 - Math.random()); // Shuffle the allowed tags array

  for (let i = 0; i < 5; i++) {
    randomTags.push(shuffledTags[i]);
  }

  return randomTags;
};
    await queryInterface.addColumn('Users', 'gender', {
      type: Sequelize.ENUM('homme', 'femme'),
      allowNull: false,
      defaultValue: 'homme'
    });
    await queryInterface.addColumn('Users', 'interest', {
      type: Sequelize.ENUM('homme', 'femme', 'bisexuel'),
      allowNull: false,
      defaultValue: 'bisexuel'
    });
    await queryInterface.addColumn('Users', 'tags', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      defaultValue: generateRandomTags(),
    });
    await queryInterface.addColumn('Users', 'age', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: '18',
      validate: {
        min: 18,
        max: 100
      }
    });
    await queryInterface.addColumn('Users', 'fameRating', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.0
    });
    await queryInterface.addColumn('Users', 'biography', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'localisation', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'gender');
    await queryInterface.removeColumn('Users', 'interest');
    await queryInterface.removeColumn('Users', 'tags');
    await queryInterface.removeColumn('Users', 'age');
    await queryInterface.removeColumn('Users', 'fameRating');
    await queryInterface.removeColumn('Users', 'biography');
    await queryInterface.removeColumn('Users', 'localisation');
  }
};
