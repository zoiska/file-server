const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in', user: req.user});
});

router.post('/register', async (req, res) => {
  try {
    const rv = await userController.addUser(req.body);
    res.json(rv);
  } catch (error) {
    res.status(400).json({Error: error.message});
  }
});

router.get('/logout', (req, res) => {
  req.logout(() => {
  res.send('Logged out');
  });
});

router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
