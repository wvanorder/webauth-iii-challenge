const jwt = require('jsonwebtoken');

const secrets = require('../configs/secrets');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ error: 'your token is out of ammo, it needs fixing', err})
            } else {
                req.user = {
                    username: decodedToken.username,
                    department: decodedToken.department                
                };
                next();
            }
        });
    } else {
        res.status(404).json({ error: 'you need to give me a token, man' });
    }
};