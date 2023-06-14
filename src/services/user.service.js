import User from '../models/user.model';
const bcrypt = require('bcrypt');

import { createAccessToken, createRefreshToken } from '../utils/jwthelper';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id, userId) => {
  const data = await User.findById({ _id: id });
  return data;
};

//create new user
export const userRegistration = async (body) => {
  const doseExist = await User.findOne({ email: body.email });
  if (doseExist) {
    throw new Error(`${body.email}is  already been registered`);
  } else {
    const saltRounds = 10;
    const hashpassword = bcrypt.hashSync(body.password, saltRounds);
    body.password = hashpassword;
    const data = await User.create(body);
    return data;
  }
};

//user login
export const loginUser = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });
    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      throw new Error('Invalid credentials');
    }
    const accessToken = createAccessToken(user.email, user._id);
    const refreshToken = createRefreshToken(user.email, user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return {
      accessToken,
      refreshToken
    };
  } catch (error) {
    throw error;
  }
};

export const generateAccessToken = async (body) => {
  try {
    const userId = body._id;
    const email = body.email;
    const accessToken = createAccessToken(email, userId);
    return { accessToken };
  } catch (err) {
    next(err);
  }
};
