const PostSchema = require('../models/Post');
const { faker } = require('@faker-js/faker');
const createManyComment = require('./createComments');
const {
  getRandomArrayMember,
  getRandomArbitrary,
  getRandomManyArrayMember,
} = require('./utils');

// CREATE FAKE POST CONTENT OBJECT
const createRandomPost = (userIdArray) => {
  return {
    content: faker.lorem.sentences(),
    author: getRandomArrayMember(userIdArray),
  };
};

// CREATE DOC ON MONGODB, RETURN OBJECT_ID OF DOC
const savePostToDb = async (userIdArray) => {
  const numOfComments = getRandomArbitrary(2, 6);

  const result = createRandomPost(userIdArray);
  // create random amount of comment to this post
  // with comment's author is random ones in given user array
  result.comments = await createManyComment(userIdArray, numOfComments);
  result.likes = getRandomManyArrayMember(userIdArray);

  const post = await PostSchema.create(result);
  return post._id;
};

// WITH GIVEN ARRAY LENGTH, CREATE POSTS ARRAY
const createManyPosts = async (userArray, postAmount) => {
  const POSTS = [];
  const userIdArray = userArray.map((user) => user._id);

  for (let index = 0; index < postAmount; index++) {
    const post = await savePostToDb(userIdArray);
    await POSTS.push(post);
  }

  return POSTS;
};

module.exports = createManyPosts;
