const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const {
  handleUpload,
  listUploads
} = require('../controllers/uploadController');

router.post('/', upload.single('files'), handleUpload);
router.get('/', listUploads);

module.exports = router;
