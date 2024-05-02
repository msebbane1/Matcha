const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');

const app = express();

app.use(cors());
// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Routes a mettre ici
app.use('/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Backend is working on app.js!');
});

module.exports = app;
