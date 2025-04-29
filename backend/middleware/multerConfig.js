const multer = require('multer');
const path = require('path');

const uploadFolder = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, file.originalname),
});

module.exports = multer({ storage });
