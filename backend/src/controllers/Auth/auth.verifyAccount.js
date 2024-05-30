const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const User = require('../../models/User');

// CONFIRMATION/ENVOI MAIL

// lien unique (token unique)
exports.generateVerificationLink = () => {
    return uuidv4();
};
  
exports.saveVerificationLinkId = async (userId, verificationLink) => {
    await User.update({ verificationLink }, { where: { id: userId } });
};
  
exports.sendVerificationEmail = async (email, verificationLink) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true pour utiliser TLS (port 465), false pour utiliser STARTTLS (port 587)
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Vérification de votre compte Matcha',
      html: `<p>Merci de vous être inscrit sur notre site de rencontre Matcha ! Veuillez cliquer sur le lien suivant pour vérifier votre compte : <a href="${verificationLink}">${verificationLink}</a></p>`
    };
  
    await transporter.sendMail(mailOptions);
};
  

exports.verifyAccount = async (verificationLink) => {
 
    const user = await User.findOne({ where: { verificationLink } });
  
    if (user) {
      user.verified = true;
      await user.save();
      
      //pour le supprimer de la base de donnee
      user.verificationLink = null;
      await user.save();
  
      return true;
    }
  
    return false;
};