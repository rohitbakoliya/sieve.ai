import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/User';
import { cookieExtractor } from '../utils';

const GoogleAuthCallback = async (_accessToken, _refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ googleId: profile.id });
    // existing user with googleId
    if (user) {
      return done(undefined, user);
    }

    // check for existing user with same email as google email
    const existingUser = await User.findOne({ email: profile._json.email });
    if (existingUser) {
      // then link both local and google accounts
      existingUser.googleId = profile.id;
      existingUser.provider = ['google', 'local'];
      const savedUser = await existingUser.save();
      return done(undefined, savedUser);
    }

    // user does not exist then create a new user
    console.log(`user doesn't exists`);
    const newUser = new User({
      name: profile.displayName,
      provider: ['google'],
      googleId: profile.id,
      email: profile._json.email,
    });

    const savedUser = newUser.save();
    return done(undefined, savedUser);
  } catch (err) {
    return done(err, false);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    GoogleAuthCallback
  )
);

const JwtVerifyCallback = async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id).select('-password -__v');

    if (!user) return done(undefined, false);
    return done(undefined, user);
  } catch (err) {
    return done(err, false);
  }
};

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_TOKEN_SECRET,
    },
    JwtVerifyCallback
  )
);
