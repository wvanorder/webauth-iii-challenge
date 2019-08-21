const jwt = require('jsonwebtoken');

const secrets = require('./secrets');

module.exports = (user) => {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department,
        isCool: true
    };

    const options = {
        expiresIn: '6h'
    };

    return jwt.sign(payload, secrets.jwtSecret, options)
};

