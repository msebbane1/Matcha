const jwt = require('jsonwebtoken');
const crypto = require('crypto');


exports.generatesecretkey = () => {
    return crypto.randomBytes(32).toString('hex');
};

exports.generatetokenjwt = (payload) => {
    const secretKey = this.generatesecretkey()
    const tokenJwt = jwt.sign( payload, secretKey
    , { expiresIn: '10h' });

    return tokenJwt;
};
