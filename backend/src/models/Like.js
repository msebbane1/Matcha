const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const Like = sequelize.define('Like', {
  likerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  likedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  isLikeClicked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});


module.exports = Like;
