const CommentSchema = require('../models/Comment');
const { faker } = require('@faker-js/faker');

const { getRandomArrayMember } = require('./utils');

// CREATE FAKE COMMENT CONTENT OBJECT
const createRandomComment = (userIdArray) => {
  return {
    content: faker.lorem.sentences(),
    author: getRandomArrayMember(userIdArray),
  };
};

// CREATE DOC ON MONGODB, RETURN OBJECT_ID OF DOC
const saveCommentToDb = async (userIdArray) => {
  const result = createRandomComment(userIdArray);
  const comment = await CommentSchema.create(result);
  return comment._id;
};

// WITH GIVEN ARRAY LENGTH, CREATE COMMENTS ARRAY
const createManyComment = async (userIdArray, commentAmount) => {
  const COMMENTS = [];

  for (let index = 0; index < commentAmount; index++) {
    const commentId = await saveCommentToDb(userIdArray);
    await COMMENTS.push(commentId);
  }

  return COMMENTS;
};

module.exports = createManyComment;
