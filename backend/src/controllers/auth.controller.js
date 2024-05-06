const authUtils = require('./auth.utils');
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
  

  // Register


exports.register = (req, res) => {
    const { email, last_name, first_name, username, password, check_password } = req.body;
    const hashedPassword = authUtils.hashPassword(password);

   /* if (authUtils.emptyInput(username) || authUtils.emptyInput(last_name) || authUtils.emptyInput(first_name) || authUtils.emptyInput(email) || authUtils.emptyInput(password)) {
       return res.status(401).json({ success: false, message: 'Veuillez saisir toutes les informations manquantes' });
    }*/
    
    if (authUtils.validateEmail(email)) {
      return res.status(401).json({ success: false, message: 'Veuillez saisir une adresse e-mail valide.' });
    }
    if (!authUtils.validateName(last_name) || !authUtils.validateName(first_name)) {
      return res.status(401).json({ success: false, message: 'Nom et Prenom invalide.' });
    }
    
    if (!authUtils.validatePassword(password)) {
      return res.status(401).json({ success: false, message: 'Votre mot de passe doit avoir au moins 8 caractères et inclure des caractères spéciaux, au moins un chiffre, une lettre majuscule et une lettre minuscule.' });
    }
    
    if (!hashedPassword) {
      return res.status(500).json({ success: false, message: 'Erreur lors du hachage du mot de passe' });
    }
    

  // Creer dans la base de données
  if (username === 'pass' && password === 'pass') {
    res.json({ success: true, message: 'Authentification réussie' });
  } else {
    res.status(401).json({ success: false, message: 'Le Nom d\'utilisateur ou le mot de passe est incorrect' });
  }
};