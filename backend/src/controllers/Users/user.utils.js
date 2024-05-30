const User = require('../../models/User');

exports.getUserPreferences = async (userId, res) => { 
  try {
    const userSession = await User.findByPk(userId);
    if (!userSession) {
      throw new Error('Utilisateur non trouvé');
    }

    let genderInterest = userSession.interest;

    if (genderInterest === "bisexuel") {
      genderInterest = ['homme', 'femme'];
    }

    const userPreferences = {
      interest: genderInterest,
      gender: userSession.gender,
      age: userSession.age
    };
    
    if (!userPreferences.gender || !userPreferences.interest || !userPreferences.age) {
      throw new Error('Les préférences de l\'utilisateur sont incomplètes');
    }

    return userPreferences;
  } catch (err) {
    console.error('Erreur lors de la récupération des préférences de l\'utilisateur :', err);
    res.status(500).json({ message: err.message });
  }
};