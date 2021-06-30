import express from 'express';
import httpStatus from 'http-status-codes';
import authRoutes from './auth.route';

const router = express.Router();

// auth routes
router.use('/auth', authRoutes);

// other routes
router.use('/*', (req, res) => {
  res.status(httpStatus.NOT_IMPLEMENTED).json({ error: 'Api endpoint Not Implemented!' });
});

export default router;
