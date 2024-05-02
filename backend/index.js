const https = require('https');
const fs = require('fs');
const app = require('./src/app');

const privateKey = fs.readFileSync('./nginx/localhost.key', 'utf8');
const certificate = fs.readFileSync('./nginx/localhost.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(8080, () => {
    console.log('Server running on port 8080');
});
