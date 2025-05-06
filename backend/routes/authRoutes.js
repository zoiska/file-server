const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in', user: req.user});
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
