const UserSchema = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');

const getUserProfile = async (req, res) => {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValidId) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `User with  ID ${req.params.id} does not exist`,
    });
  }

  const user = await UserSchema.findById(req.params.id);

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `User with  ID ${req.params.id} does not exist`,
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    user,
  });
};

const updateProfile = async (req, res) => {
  const { bio, profilePic, email, username } = req.body;
  const { userId } = req.user;
  if (!bio || !profilePic || !email || !username) {
    return res.status(500).json({
      success: false,
      msg: 'Please provide all values',
    });
  }

  // find User
  const user = await UserSchema.findById(userId);

  if (!user) {
    res.status(404).json({
      success: false,
      msg: `User with ID ${userId} doesn't exist`,
    });
  }

  // user found, update
  user.bio = bio;
  user.profilePic = profilePic;
  user.email = email;
  user.username = username;
  await user.save();

  // success, send data back
  const token = user.createJWT();
  return res.status(200).json({
    success: true,
    token,
    user,
  });
};

const updatePassword = async (req, res, next) => {
  const { userId } = req.user;
  const { newPassword, confirmNewPassword } = req.body;

  // find user
  const user = await UserSchema.findById(userId).select('+password');
  if (!user) {
    res.status(404).json({
      success: false,
      msg: `User with ID ${userId} doesn't exist`,
    });
  }

  // check if new password is different to current ones
  const isMatch = await user.comparePassword(newPassword);
  if (isMatch) {
    res.status(500).json({
      success: false,
      msg: 'New and current password must be different',
    });
  }

  // check if  wrong confirm password
  if (newPassword !== confirmNewPassword) {
    res.status(500).json({
      success: false,
      msg: 'Confirm Password is incorrect',
    });
  }

  // Success, save new password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    msg: `Updated Password`,
  });
};

const removeUser = async (req, res, next) => {
  const { userId } = req.user;

  const user = await UserSchema.findById(userId);
  await user.remove();

  res.status(200).json({ msg: 'remove user successful' });
};

module.exports = {
  updateProfile,
  updatePassword,
  getUserProfile,
  removeUser,
};
