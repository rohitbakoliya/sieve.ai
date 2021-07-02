import express from 'express';
import path from 'path';
const multer = require('multer');

const cwd = process.cwd();

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, cwd + '/uploads');
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post('/', upload.array('resume', 100), (req, res) => {
  console.log(req.body);
  return res.json({ files: req.files, body: req.body });
});

export default router;
