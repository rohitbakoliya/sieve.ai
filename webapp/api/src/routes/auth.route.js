import express from 'express';
import passport from 'passport';
import { CLIENT_URL } from '../config';
import { generateToken } from '../middlewares/generateToken';
import { checkAuth, login, logout, signup } from '../controllers/auth.controller';
import { passportJWT } from '../middlewares/passportJWT';

const router = express.Router();

const passportGoogle = passport.authenticate('google', {
  session: false,
  failureRedirect: CLIENT_URL,
});

/**
 * @desc    Auth with google
 * @route   GET /api/auth/google
 * @access  public
 */
router.get(
  '/google',
  passport.authenticate('google', { session: false, scope: ['profile', 'email'] })
);

/**
 * @desc    Google auth callback
 * @route   GET /api/auth/google/callback
 * @access  public
 */
router.get('/google/callback', passportGoogle, generateToken);

router.get('/check-auth', passportJWT, checkAuth);

router.post('/login', login);

router.get('/logout', passportJWT, logout);

router.post('/signup', signup);

export default router;
