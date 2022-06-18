const { getRandomArbitrary } = require('./utils');
const createManyUsers = require('./createUsers');
const createManyPosts = require('./createPosts');

const UserSchema = require('../models/User');
const { faker } = require('@faker-js/faker');
// CREATE USER FOR FRIEND LIST
const createFriendsObject = async () => {
  const acceptedFriendsAmount = getRandomArbitrary(2, 6);
  const accepted = await createManyUsers(acceptedFriendsAmount);

  const rtoFriendsAmount = getRandomArbitrary(2, 6);
  const requestToOthers = await createManyUsers(rtoFriendsAmount);

  const rtmFriendsAmount = getRandomArbitrary(2, 6);
  const requestToMe = await createManyUsers(rtmFriendsAmount);

  return { accepted, requestToMe, requestToOthers };
};

const createUser = async () => {
  const friends = await createFriendsObject();
  const data = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    friends,
    profilePic: faker.internet.avatar(),
  };

  const user = await UserSchema.create(data);
  return user;
};

// CREATE DATABASE
const createDatabase = async () => {
  // create test user account
  const user = await createUser();
  const { accepted, requestToMe, requestToOthers } = user.friends;
  let userId = [user._id];

  // create user has no friendship with test account
  const unknownUser = await createManyUsers(10);

  // merge into single array for creating posts, likes, comments
  userId = [
    ...userId,
    ...accepted,
    ...requestToMe,
    ...requestToOthers,
    ...unknownUser,
  ];

  // const postAmount = getRandomArbitrary();
  const postAmount = 50;
  await createManyPosts(userId, postAmount);

  return user;
};

module.exports = createDatabase;
