import jwt from 'jsonwebtoken';
import httpStatus from 'http-status-codes';
import User from '../models/User';
import { validateUserLogin, validateUserSignup } from '../validators/User.validators';

/**
 * @desc    To check authentication status
 * @route   GET /api/auth/check-auth
 * @access  private
 */

export const checkAuth = (req, res) => {
  res.status(httpStatus.OK).json({ data: req.user });
};

/**
 * @desc    to logout current user
 * @route   GET /api/auth/logout
 * @access  private
 */
export const logout = (req, res) => {
  req.logOut();
  res.status(httpStatus.OK).clearCookie('jwt').json({ data: 'logged out successfully!' });
};

/**
 * @desc    to signup user
 * @route   POST /api/auth/signup
 * @access  public
 */
export const signup = async (req, res) => {
  const { body } = req;
  const { error, value } = validateUserSignup(body);
  if (error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });
  }
  try {
    // 1. check for email conflicts

    const findUser = await User.findOne({ email: value.email });
    if (findUser) {
      return res.status(httpStatus.CONFLICT).json({ error: `Email Already Exists` });
    }

    // 2. create new user for sign up
    const newUser = new User({
      name: body.name,
      provider: ['local'],
      email: body.email,
      password: body.password,
    });
    const savedUser = await newUser.save();

    return res.status(httpStatus.CREATED).json({ data: savedUser });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'something went wrong' });
  }
};

/**
 * @desc    to login user
 * @route   POST /api/auth/login
 * @access  public
 */
export const login = async (req, res) => {
  const { error, value } = validateUserLogin(req.body);
  if (error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });
  }
  try {
    // check if user exist
    const user = await User.findOne({ email: value.email });
    if (!user) return res.status(httpStatus.NOT_FOUND).json({ error: 'Email does not exists' });

    // user only signed up with google
    if (!user.password || !user.provider.includes('local')) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: 'Unknown auth method, Try logging in with Google',
      });
    }

    // Check/Compares password
    const validPassword = await user.isValidPassword(value.password);
    if (!validPassword)
      return res.status(httpStatus.FORBIDDEN).json({ error: 'Password is incorrect' });

    // valid user so create jwt token
    const token = jwt.sign(
      {
        provider: user.provider,
        name: user.name,
        email: user.email,
        id: user.id,
      },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: '2h' }
    );

    return res
      .status(httpStatus.OK)
      .cookie('jwt', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true })
      .send({
        data: {
          provider: user.provider,
          name: user.name,
          email: user.email,
          id: user.id,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt,
        },
      });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'something went wrong' });
  }
};
