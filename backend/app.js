require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const passport = require('passport');

require('./passport/passportConfig');

const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'lax',
    maxAge: 1000 * 60 * 30, // 1h
    secure: false
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Authentication middleware
function requireLogin(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).send('Not authenticated');
}

const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes (prefix with /api)
app.use('/api/uploads', requireLogin, uploadRoutes);
app.use('/api', authRoutes);

// Serve React frontend
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

module.exports = app;
