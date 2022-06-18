const UserSchema = require('../models/User');
const { faker } = require('@faker-js/faker');
// CREATE FAKE USER PROFILE OBJECT
const createRandomUser = () => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    profilePic: faker.internet.avatar(),
    bio: faker.lorem.sentences(2),
  };
};
// CREATE DOC ON MONGODB, RETURN OBJECT_ID OF DOC
const saveUserToDb = async () => {
  const result = createRandomUser();
  const user = await UserSchema.create(result);
  return user._id;
};

// WITH GIVEN ARRAY LENGTH, CREATE USERS ARRAY
const createManyUsers = async (userAmount) => {
  const USERS = [];

  for (let index = 0; index < userAmount; index++) {
    const user = await saveUserToDb();
    await USERS.push(user);
  }

  return USERS;
};

module.exports = createManyUsers;
