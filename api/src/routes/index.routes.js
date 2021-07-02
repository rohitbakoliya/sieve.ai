import express from 'express';
import httpStatus from 'http-status-codes';
import { passportJWT } from '../middlewares/passportJWT';
import authRoutes from './auth.route';
import uploadRoutes from './upload.route';

const router = express.Router();

// auth routes
router.use('/auth', authRoutes);

router.use('/upload', passportJWT, uploadRoutes);

// other routes
router.use('/*', (req, res) => {
  res.status(httpStatus.NOT_IMPLEMENTED).json({ error: 'Api endpoint Not Implemented!' });
});

export default router;
