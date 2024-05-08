const authUtils = require('./auth.utils');
const User = require('../models/User');
// LOGIN

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    res.status(401).json({ success: false, message: 'Veuillez saisir le Nom d\'utilisateur' });
    return;
  }
  if (!password) {
    res.status(401).json({ success: false, message: 'Veuillez saisir le mot de passe' });
    return;
  }

  // Vérification dans la base de données
  if (username === 'pass' && password === 'pass') {
    res.json({ success: true, message: 'Authentification réussie' });
  } else {
    res.status(401).json({ success: false, message: 'Le Nom d\'utilisateur ou le mot de passe est incorrect' });
  }
};
  

// REGISTER

exports.register = async (req, res) => {
    const { email, last_name, first_name, username, password, check_password } = req.body;

    try {

      const existingUserEmail = await User.findOne({ where: { email } });
      const existingUserUsername = await User.findOne({ where: { username } });
  
      // Email
      if (existingUserEmail) {
        return res.status(409).json({ success: false, message: 'Cet adresse E-mail existe déjà' });
      }
      if (!authUtils.validateEmail(email)) {
        return res.status(401).json({ success: false, message: 'Veuillez saisir une adresse e-mail valide.' });
      }

      // Name
      if (!authUtils.validateName(last_name) || !authUtils.validateName(first_name)) {
        return res.status(401).json({ success: false, message: 'Veuillez saisir un Nom/Prenom valide.' });
      }

      // Username
      if (existingUserUsername) {
        return res.status(409).json({ success: false, message: 'Cet utilisateur existe déjà' });
      }
      if (!authUtils.validateUsername(username)) {
        return res.status(401).json({ success: false, message: 'Veuillez saisir un Nom d\'utilisateur valide.' });
      }
      
      // Password
      if (!authUtils.validatePassword(password)) {
        return res.status(401).json({ success: false, message: 'Votre mot de passe doit avoir au moins 8 caractères et inclure des caractères spéciaux, au moins un chiffre, une lettre majuscule et une lettre minuscule.' });
      }
      if (check_password !== password) {
        return res.status(401).json({ success: false, message: 'Les mots de passe ne correspondent pas' });
      }

      const hashedPassword = authUtils.hashPassword(password);

      if (!hashedPassword) {
        return res.status(500).json({ success: false, message: 'Erreur lors du hachage du mot de passe' });
      }

      /*password = hashedPassword;*/

      await User.create({ username, email, password }); // a modifier pour le password
  
      res.json({ success: true, username: username, email: email, message: 'Création du compte réussie' });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la création du compte' });
  }
};