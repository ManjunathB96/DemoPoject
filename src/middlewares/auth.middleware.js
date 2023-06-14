import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const user = await jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);
    req.body.userId = user._id;

    next();
  } catch (error) {
    next(error);
  }
};

export const verifyRefreshToken = async (req, res, next) => {
  try {
    let refreshToken = req.header('Authorization');
    if (!refreshToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
      refreshToken = refreshToken.split(' ')[1];

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userId = decoded._id;
    const user = await User.findById(userId);
  
    if (!user || refreshToken !== user.refreshToken) {
      throw new Error('Invalid refresh token');
    }
    req.body = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
