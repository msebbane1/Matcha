const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};
  
exports.validateName = (name) => {
    const regex = /^[A-Za-z-']+$/;
    return regex.test(name) && name.length >= 2 && name.length <= 30;
  };

// Lettres (majuscules et minuscules), chiffres, tirets et underscores autorisés, longueur entre 3 et 20 caractères
exports.validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_-]{3,20}$/;
    return regex.test(username);
};

exports.validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    return passwordRegex.test(password);
};

exports.hashPassword = (password) => {
    try {
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      return hashedPassword;
    } catch (err) {
      console.error('Erreur lors du hachage du mot de passe :', err);
      return null;
    }
  };

exports.emptyInput = (input) => {
    return input === '';
  };


  