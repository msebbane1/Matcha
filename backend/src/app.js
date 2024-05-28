const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Routes a mettre ici
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      const currentTime = result.rows[0].now;
      const message = 'Backend is working on app.js and db too!\n' +
                      'La date actuelle est : ' + currentTime;
      res.send(message);
    }
  });
});

module.exports = app;
