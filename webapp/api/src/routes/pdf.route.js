import express from 'express';
import path from 'path';
const router = express.Router();

router.get('/:userId/:resumeId', (req, res) => {
  const { resumeId, userId } = req.params;
  const url = path.join(process.cwd(), '..', 'uploads', userId, resumeId);
  res.sendFile(url);
});

export default router;
