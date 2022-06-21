import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
const protect = asyncHandler(async (req, res, next) => {
  console.log('Entered Proteeee');
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.userProfileDetails = await User.findById(decoded.id).select(
        '-password'
      );
      console.log('before next');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('not Authorized,token failed');
    }

    if (!token) {
      res.status(401);
      throw new Error('Not Authorized,No token');
    }
  }
});

const admin = (req, res, next) => {
  if (req.userProfileDetails && req.userProfileDetails.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('not authorized as Admin');
  }
};

export { protect, admin };
