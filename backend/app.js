//the main express app

const express = require('express');
const path = require('path');
const fs = require('fs');

const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Middleware
app.use(express.json());

// Static upload folder
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}
app.use('/uploads', express.static(uploadFolder));

// Routes
app.use('/uploads', uploadRoutes);

// Serve React build in production
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

module.exports = app;
