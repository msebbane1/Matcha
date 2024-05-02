
// LOGIN

exports.login = (req, res) => {
    const { username, password } = req.body;
  
    // verifier dans base de donnee
    if (username === 'utilisateur' && password === 'motdepasse') {
      res.json({ success: true, message: 'Authentification réussie' });

    } else {
      res.status(401).json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
  };
  

  // SignUp