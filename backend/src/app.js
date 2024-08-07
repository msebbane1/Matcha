const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const likeRoutes = require('./routes/like.routes');
const cors = require('cors');
const pool = require('./db');


const app = express();

// app.js
require('dotenv').config();


app.use(cors({
  origin: 'https://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Authorization, Content-Type'
}));
// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Expires', '0');
  next();
});
/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});*/


// Routes a mettre ici
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/like', likeRoutes);

app.get('/', (req, res) => {
  const message = 'Backend is working on app.js';
      res.send(message);
});
/*
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
});*/

module.exports = app;
