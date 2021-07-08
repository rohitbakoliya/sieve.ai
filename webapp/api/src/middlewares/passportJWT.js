import passport from 'passport';
import httpStatus from 'http-status-codes';

export const passportJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false, failWithError: true }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Unauthorized user' });
    req.user = user;
    next();
  })(req, res, next);
};
