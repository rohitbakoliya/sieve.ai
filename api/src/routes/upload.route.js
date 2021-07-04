import express from 'express';
import path from 'path';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

const multer = require('multer');

const cwd = process.cwd();

const router = express.Router();

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join(cwd, '..', 'uploads', req.user._id.toString());
    await fs.ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const _fname = uuidv4() + path.extname(file.originalname);
    req._fname = _fname;
    cb(null, _fname);
  },
});
const upload = multer({ storage });

router.post('/', upload.single('resume'), (req, res) => {
  return res.json({ filename: req._fname });
});

export default router;
