import express from 'express';
import httpStatus from 'http-status-codes';
import { passportJWT } from '../middlewares/passportJWT';
import authRoutes from './auth.route';
import uploadRoutes from './upload.route';
import jobRoutes from './job.route';
import pdfRoutes from './pdf.route';

const router = express.Router();

// auth routes
router.use('/auth', authRoutes);

router.use('/upload', passportJWT, uploadRoutes);

router.use('/jobs', passportJWT, jobRoutes);

router.use('/pdf',passportJWT, pdfRoutes);

// other routes
router.use('/*', (req, res) => {
  res.status(httpStatus.NOT_IMPLEMENTED).json({ error: 'Api endpoint Not Implemented!' });
});

export default router;
