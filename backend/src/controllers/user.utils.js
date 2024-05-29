const User = require('../models/User');

exports.getUserPreferences = (id) => {
    try {
        const user = User.findByPk(id);
        if (!user) {
          throw new Error('Utilisateur non trouvé');
        }
        const userPreferences = {
          interest: user.interest,
          genre: user.genre
        };
    
        return userPreferences;
      } catch (err) {
        console.error('Erreur lors de la récupération des préférences de l\'utilisateur :', err);
        throw err;
      }
};