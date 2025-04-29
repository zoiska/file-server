const path = require('path');
const fs = require('fs');

const uploadFolder = path.join(__dirname, '..', 'uploads');

exports.handleUpload = (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');
  console.log('Uploaded:', req.file.originalname);
  res.send('Upload successful');
};

exports.listUploads = (req, res) => {
  fs.readdir(uploadFolder, (err, files) => {
    if (err) return res.status(500).json({ error: 'Could not list files' });
    res.json(files);
  });
};
