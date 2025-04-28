const express = require('express')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 5000

app.use(cors())

const uploadFolder = path.join(__dirname, '/uploads')
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder)
}
app.use('/uploads', express.static(uploadFolder))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })

app.post('/uploads', upload.single('files'), (req, res) => {
  console.log('Uploaded:', req.file.originalname)
  res.send('Upload successful')
});

app.get('/uploads', (req, res) => {
  fs.readdir(uploadFolder, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Could not list files' })
    }
    res.json(files)
  })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})