const PostSchema = require('../models/Post');
const UserSchema = require('../models/User');
const { faker } = require('@faker-js/faker');
const createManyComment = require('./createComments');

const users = [
  '62ab57d4ab050980c6a639aa',
  '62ab57d4ab050980c6a639ac',
  '62ab57d5ab050980c6a639ae',
  '62ab57d5ab050980c6a639b0',
  '62ab57d5ab050980c6a639b2',
  '62ab57d5ab050980c6a639b4',
  '62ab57d5ab050980c6a639b6',
  '62ab57d5ab050980c6a639b8',
  '62ab57d6ab050980c6a639ba',
  '62ab57d6ab050980c6a639bc',
  '62ab57d6ab050980c6a639be',
  '62ab57d6ab050980c6a639c0',
  '62ab57d6ab050980c6a639c2',
  '62ab57d6ab050980c6a639c4',
  '62ab57d7ab050980c6a639c6',
  '62ab57d7ab050980c6a639c8',
  '62ab57d7ab050980c6a639ca',
  '62ab57d7ab050980c6a639cc',
  '62ab57d7ab050980c6a639ce',
  '62ab57d8ab050980c6a639d0',
  '62ab57d8ab050980c6a639d2',
  '62ab57d8ab050980c6a639d4',
  '62ab57d8ab050980c6a639d6',
  '62ab57d8ab050980c6a639d8',
  '62abf6d40b0f3fe9ef5e3f16',
  '62abf6d40b0f3fe9ef5e3f18',
  '62abf6d50b0f3fe9ef5e3f1a',
  '62abf6d50b0f3fe9ef5e3f1c',
  '62abf6d50b0f3fe9ef5e3f1e',
  '62abf6d50b0f3fe9ef5e3f20',
];

// CREATE FRIENDS OBJECT
const shuffleUsers = faker.helpers.shuffle(users);
const accepted = shuffleUsers.slice(0, 5);
const requestToMe = shuffleUsers.slice(6, 10);
const requestToOthers = shuffleUsers.slice(11, 15);
const friends = { accepted, requestToMe, requestToOthers };

// CREATE RANDOM USER PROFILE
const createRandomUser = () => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    profilePic: faker.internet.avatar(),
    bio: faker.lorem.sentences(2),
    friends,
  };
};

// CREATE POST BY USER
const createRandomPost = async (id, userIdArray) => {
  comments = await createManyComment(userIdArray, 4);
  likes = faker.helpers.arrayElements(userIdArray);
  const post = {
    content: faker.lorem.sentences(),
    author: id,
    comments,
    likes,
  };

  await PostSchema.create(post);
};

// CREATE USER, CREATE FEW USER'S POST
const createUserData = async () => {
  const result = createRandomUser();
  const user = await UserSchema.create(result);
  //create few user's post
  for (let index = 0; index < 3; index++) {
    await createRandomPost(user._id, [user._id, ...users]);
  }
  return user;
};

module.exports = createUserData;
