const bcrypt = require('bcrypt');

const saltRounds = 10; 
/*email, last_name, first_name, username, password, check_password  */


exports.validateEmail = (email) => {
    return email === '';
  };

exports.validateName = (name) => {
    const regex = /^[A-Za-z-]+$/;
    if (!regex.test(name) || name === '')
        return false;
    return true;
};

// Un minimun de 5lettre
exports.validateUsername = (username) => {
    return username === '';
};


exports.validateCheck_Password = (check_password, password) => {
    if(password != check_password)
        return false;
    return true;
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

// Fonction de validation du mot de passe selon la politique
exports.validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    return passwordRegex.test(password);
  };
  