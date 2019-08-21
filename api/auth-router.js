const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Auth = require('./auth-model.js');
const secrets = require('../configs/secrets.js');
const restricted = require('./restricted-middleware');
const generateToken = require('../configs/token-stuff');

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 11);
    user.password = hash;

    Auth.add(user)
      .then(user => {
          res.status(201).json({ Success: `${user.username} has been successfully created.`})
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ Error: 'the flood invaded during the add.', err })
      })
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    Auth.findBy({ username })
      .first()
      .then(user => {
          if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({
                message: `welcome, ${user.username}. You are currently operating in the ${user.department} department.`,
                token
            })
          } else {
              res.status(401).json({ message: 'user not found or invalid credentials' })
          }
      })
      .catch(err => {
          res.status(500).json({ error: 'the flood won again when you were logging in', err })
      })
});

router.get('/users', restricted, (req, res) => {
    Auth.find()
      .then(users => {
          res.json({ loggedInUser: req.user.username, users })
      })
      .catch(err => {
          res.status(500).json({ error: 'could not get the users' })
      })
})

module.exports = router;