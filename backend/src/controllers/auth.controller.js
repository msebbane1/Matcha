const authUtils = require('./auth.utils');
const authVerifyAccount = require('./auth.verifyAccount');
const User = require('../models/User');

//////////////////////////////////////////// LOGIN /////////////////////////////////////
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({ success: false, message: 'Veuillez saisir un nom d\'utilisateur et un mot de passe' });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Le nom d\'utilisateur est incorrect' });
    }

    // Comparer les mots de passe hachés
    const passwordMatch = authUtils.comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Le mot de passe est incorrect' });
    }

    res.json({ success: true, message: 'Authentification réussie', user });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de l\'authentification' });
  }
};
  

//////////////////////////////////// REGISTER //////////////////////////////////////////////
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
      /* A REMETTRE ET A ENELEVER POUR TESTER
      if (!authUtils.validatePassword(password)) {
        return res.status(401).json({ success: false, message: 'Votre mot de passe doit avoir au moins 8 caractères et inclure des caractères spéciaux, au moins un chiffre, une lettre majuscule et une lettre minuscule.' });
      }*/
      if(authUtils.emptyInput(password)){ // a enlever plus tard

        return res.status(401).json({ success: false, message: 'Mot de passe non valide' });

      }
      if (check_password !== password) {
        return res.status(401).json({ success: false, message: 'Les mots de passe ne correspondent pas' });
      }

      const hashedPassword = authUtils.hashPassword(password);

      if (!hashedPassword) {
        return res.status(500).json({ success: false, message: 'Erreur lors du hachage du mot de passe' });
      }

      /*password = hashedPassword;*/
        const user = await User.create({ username, email, password: hashedPassword }); // a modifier pour le password
        
        const verificationId = authVerifyAccount.generateVerificationLink();
        const verificationLink = `https://localhost:4200/verification-account/${verificationId}`

        await authVerifyAccount.saveVerificationLinkId(user.id, verificationId);

        await authVerifyAccount.sendVerificationEmail(email, verificationLink);

        res.json({ success: true, username: username, email: email, first_name: first_name, last_name: last_name, message: 'Création du compte réussie' });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la création du compte' });
  }
};


//////////////////////////////////// CHECK VERIFICATION LINK ///////////////////////////////////////////
exports.verifyAccount = async (req, res) => {
  const { verificationId } = req.params;

  try {
    const isVerified = await authVerifyAccount.verifyAccount(verificationId);
    if (isVerified) {
      res.json({ success: true, message: 'Vérification du compte réussie' });
    } else {
      res.json({ success: false, message: 'Échec de la vérification du compte' });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du compte :', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de l\'authentification' });
  }
};
