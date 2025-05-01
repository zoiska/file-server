const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send('Logged in');
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
