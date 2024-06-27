const User = require('../../models/User');
const userUtils = require('./user.utils');
const Sequelize = require('sequelize');

//A trier en 1 seul fois avec req.body (pour recuperer searchQuery pour chaque input) faire un swith 

// A faire attention a gerer quand c'est la 1ere connection doit obligatoirement rentrer son genre pour pas avoir d'erreur
exports.getPublicInfosUsers = async (req, res) => {
  try {

    const { userId } = req.body;
    if (!userId) {
      throw new Error('ID de l\'utilisateur manquant');
    }
    userPreferences = await userUtils.getUserPreferences(userId, res);

    if (!userPreferences.gender || !userPreferences.interest) {
      throw new Error('Les préférences de l\'utilisateur sont incomplètes ou invalides1');
    }

    let genderFilter = userPreferences.interest;
    if (Array.isArray(genderFilter)) {
      genderFilter = { [Sequelize.Op.in]: genderFilter };
    }

    const users = await User.findAll({
      where: {
        gender: genderFilter,
        interest: {
          [Sequelize.Op.or]: [userPreferences.gender, 'bisexuel']
        }
      },
      order: [
        ['interest', 'ASC']
      ]
    });

    /* Ajouter la photo */
    const usersInfosPublic = users.map(user => ({
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      interest: user.interest,
      tags: user.tags,
      age: user.age,
      fameRating: user.fameRating,
      biography: user.biography,
      localisation: user.localisation,
      status: user.status
    }));
    res.json(usersInfosPublic);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: err.message });
  }
};


exports.getFilteredUsers = async (req, res) => {

  try {
    const { userId } = req.body;
    if (!userId) {
      throw new Error('ID de l\'utilisateur manquant');
    }
    userPreferences = await userUtils.getUserPreferences(userId, res);

    if (!userPreferences.gender || !userPreferences.interest) {
      throw new Error('Les préférences de l\'utilisateur sont incomplètes ou invalides1');
    }

    let genderFilter = userPreferences.interest;
    if (Array.isArray(genderFilter)) {
      genderFilter = { [Sequelize.Op.in]: genderFilter };
    }

    const filteredUsers = await User.findAll({
      where: {
        gender: genderFilter,
        interest: {
          [Sequelize.Op.or]: [userPreferences.gender, 'bisexuel']
        }
      },
      order: [
        ['interest', 'ASC']
      ]
    });

    res.json(filteredUsers);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs :', err);
    res.status(500).json({ message: err.message });
  }
};


exports.sortByAgeUsers = async (req, res) => {

  try {
    const { userId } = req.body;
    if (!userId) {
      throw new Error('ID de l\'utilisateur manquant');
    }
    userPreferences = await userUtils.getUserPreferences(userId, res);

    const minAge = userPreferences.age - 10; 
    const maxAge = userPreferences.age + 10; 
    const filteredUsers = await User.findAll({
      where: {
        age: {
          [Sequelize.Op.between]: [minAge, maxAge]
        }
      },
      order: [
        ['age', 'ASC']
      ]
    });

    res.json(filteredUsers);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs :', err);
    res.status(500).json({ message: err.message });
  }
};