const User = require('../models/User');
const userUtils = require('./user.utils');

exports.getAllUsers = async (req, res) => {
  try {
    console.log('Fetching users from the database...');
    const users = await User.findAll();
    console.log('Users fetched successfully:', users);
    res.json(users);
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

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const userPreferences = {
      interest: user.interest,
      gender: user.gender
    };

    if (!userPreferences.gender || !userPreferences.interest) {
      throw new Error('Les préférences de l\'utilisateur sont incomplètes');
    }
    let genderInterest = userPreferences.interest;

    if (genderInterest === "bisexuel") {
      genderInterest = ['homme', 'femme'];
    }
    const filteredUsers = await User.findAll({
      where: {
        /*gender: genderInterest,*/
        interest: userPreferences.gender
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

