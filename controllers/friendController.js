const UserSchema = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const createFriendRequest = async (req, res) => {
  const { targetUserId } = req.body;
  const { userId } = req.user;
  // CHECK IF ONE OF REQUIRED FIELDS IS MISSING
  if (!targetUserId) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Please provide all values',
    });
  }
  // CHECK IF PROVIDED TARGET_USER_ID IS VALID
  const user = await UserSchema.findById(userId);
  const targetUser = await UserSchema.findById(targetUserId);
  if (!targetUser) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `User with ID ${targetUserId} doesn't exist`,
    });
  }

  // CHECK IF ALREADY BEING FRIENDS OR MADE A REQUEST
  const { accepted, requestToMe, requestToOthers } = user.friends;
  // already being friend or sent friend request
  const already =
    accepted.includes(targetUserId) ||
    requestToMe.includes(targetUserId) ||
    requestToOthers.includes(targetUserId);
  if (already) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Already make friend request or being friends',
    });
  }

  // success, add user to target user's friend request  list
  targetUser.friends.requestToMe.push(user._id);
  await targetUser.save();
  user.friends.requestToOthers.push(targetUser._id);
  await user.save();

  res.status(StatusCodes.OK).json({
    success: true,
    user,
    msg: 'Friend request successful',
  });
};

const revokeFriendRequest = async (req, res) => {
  const { userId } = req.user;
  const { targetUserId } = req.body;

  // CHECK IF PROVIDED USER_ID AND TARGET_USER_ID IS VALID
  const user = await UserSchema.findById(userId);

  const targetUser = await UserSchema.findById(targetUserId);
  if (!targetUser) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `User with ID ${targetUserId} doesn't exist`,
    });
  }
  // // REMOVE REQUEST BETWEEN USER AND TARGET
  user.friends.requestToOthers = user.friends.requestToOthers.filter(
    (user) => user._id != targetUserId
  );
  await user.save();
  targetUser.friends.requestToMe = targetUser.friends.requestToMe.filter(
    (user) => user._id != userId
  );
  await targetUser.save();

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Revoked',
    user,
  });
};

const responseFriendRequest = async (req, res) => {
  const { response, targetUserId } = req.body;
  const { userId } = req.user;

  // CHECK IF ONE OF REQUIRED FIELDS IS MISSING
  if (!response && response !== false) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Please provide all values',
    });
  }
  // CHECK IF PROVIDED USER_ID AND TARGET_USER_ID IS VALID
  const user = await UserSchema.findById(userId);

  const targetUser = await UserSchema.findById(targetUserId);
  if (!targetUser) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `User with ID ${targetUserId} doesn't exist`,
    });
  }

  // // REMOVE REQUEST BETWEEN USER AND TARGET
  user.friends.requestToMe = user.friends.requestToMe.filter(
    (user) => user._id != targetUserId
  );
  await user.save();
  targetUser.friends.requestToOthers =
    targetUser.friends.requestToOthers.filter((user) => user._id != userId);
  await targetUser.save();

  if (response == false) {
    // DECLINE REQUEST
    res.status(StatusCodes.OK).json({
      success: true,
      msg: 'Decline',
      user,
    });
  } else {
    // ACCEPT FRIEND REQUEST
    user.friends.accepted.push(targetUser);
    await user.save();
    targetUser.friends.accepted.push(user);
    await targetUser.save();

    res.status(StatusCodes.OK).json({
      success: true,
      msg: 'Accepted',
      user,
    });
  }
};

const unfriend = async (req, res) => {
  const { userId } = req.user;
  const { targetUserId } = req.body;

  // CHECK IF PROVIDED USER_ID AND TARGET_USER_ID IS VALID
  const user = await UserSchema.findById(userId);

  const targetUser = await UserSchema.findById(targetUserId);
  if (!targetUser) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `User with ID ${targetUserId} doesn't exist`,
    });
  }

  // REMOVE FRIEND-RELATE BETWEEN USER AND TARGET
  user.friends.accepted = user.friends.accepted.filter(
    (user) => user._id != targetUserId
  );
  await user.save();
  targetUser.friends.accepted = targetUser.friends.accepted.filter(
    (user) => user._id != userId
  );
  await targetUser.save();

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Unfriended',
    user,
  });
};

const suggestNewFriend = async (req, res) => {
  const { userId } = req.user;

  const user = await UserSchema.findById(userId);
  const { accepted, requestToMe, requestToOthers } = user.friends;
  const knownUserId = [...accepted, ...requestToMe, ...requestToOthers, userId];

  const unknownUser = await UserSchema.find({
    _id: {
      $not: {
        $in: knownUserId,
      },
    },
  }).limit(10);

  res.status(StatusCodes.OK).json({ success: true, users: unknownUser });
};

module.exports = {
  createFriendRequest,
  responseFriendRequest,
  unfriend,
  revokeFriendRequest,
  suggestNewFriend,
};
