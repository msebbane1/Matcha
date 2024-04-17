// index.js

const express = require('express');
const app = express();
const port = 8080; // Le port sur lequel votre serveur écoutera

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
