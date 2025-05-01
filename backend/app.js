//the main express app

const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const passport = require('passport');

require('./passport/passportConfig');

const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes')

const app = express();

// Middleware?
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false })); // secret whot
app.use(passport.initialize());
app.use(passport.session());

// Static upload folder
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}
app.use('/uploads', express.static(uploadFolder));

// Routes
app.use('/uploads', requireLogin, uploadRoutes);
app.use('/auth', authRoutes)


// Middleware!
function requireLogin(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).send('Not authenticated');
}

// Serve React build in production
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

module.exports = app;
