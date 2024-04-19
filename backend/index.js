// index.js
/*
const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});*/

const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

const privateKey = fs.readFileSync('./nginx/localhost.key', 'utf8');
const certificate = fs.readFileSync('./nginx/localhost.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

httpsServer.listen(8080, () => {
    console.log('Server running on port 8080');
});
