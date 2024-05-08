const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbmatcha', 'msebbane', 'pass', {
  host: 'postgres',
  dialect: 'postgres',
  port: 5432,
});

module.exports = sequelize;

