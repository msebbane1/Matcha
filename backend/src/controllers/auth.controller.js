const authUtils = require('./auth.utils');
const authVerifyAccount = require('./auth.verifyAccount');
const authJwt = require('./auth.jwt');
const User = require('../models/User');

//////////////////////////////////////////// LOGIN /////////////////////////////////////
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !username) {
      return res.status(401).json({ success: false, message: 'Le nom d\'utilisateur n\'existe pas' });
    }

    const passwordMatch = authUtils.comparePasswords(password, user.password);

    if (!passwordMatch || !password) {
      return res.status(401).json({ success: false, message: 'Le mot de passe est incorrect' });
    }
    else {

      const tokenJwt = authJwt.generatetokenjwt({userId: user.id, userUsername: user.username})

      res.json({ success: true, 
                 message: 'Authentification réussie',
                 token: tokenJwt,
                 userInfo: {
                  username: user.username,
                  id: user.id,
                  email: user.email,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  verified: user.verified
                 }});
    }

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

      else {

        const verificationId = authVerifyAccount.generateVerificationLink();
        const verificationLink = `https://localhost:4200/verification-account/${verificationId}`

       // await authVerifyAccount.saveVerificationLinkId(user.id, verificationId);
        await authVerifyAccount.sendVerificationEmail(email, verificationLink);

        const user = await User.create(
          { username: username, 
            email: email, 
            password: hashedPassword,
            verificationLink: verificationId, 
            first_name: first_name, 
            last_name: last_name 
          });
        await user.save();

        res.json({ success: true, message: 'Création du compte réussie, veuillez vous connecter! Un lien a été envoyé sur votre e-mail afin de completer votre inscription' });
      }

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
