const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Like = require('./Like');

const allowedTags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10'];

const generateRandomTags = () => {
  const randomTags = [];
  const shuffledTags = allowedTags.sort(() => 0.5 - Math.random());

  for (let i = 0; i < 5; i++) {
    randomTags.push(shuffledTags[i]);
  }

  return randomTags;
};

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  verificationLink: {
    type: DataTypes.UUID,
    allowNull: true
  },
  verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  gender: {
    type: DataTypes.ENUM('homme', 'femme'),
    allowNull: false,
    defaultValue: 'homme'
  },
  interest: {
    type: DataTypes.ENUM('homme', 'femme', 'bisexuel'),
    allowNull: false,
    defaultValue: 'bisexuel'
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: generateRandomTags(),
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 18,
    validate: {
      min: 18,
      max: 100
    }
  },
  fameRating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  localisation: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

User.belongsToMany(User, { through: Like, as: 'Liker', foreignKey: 'likerId' });
User.belongsToMany(User, { through: Like, as: 'Liked', foreignKey: 'likedId' });


module.exports = User;


// CREER QUERY a la main et ajouter nom et prenom