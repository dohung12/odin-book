const PostSchema = require('../models/Post');
const UserSchema = require('../models/User');
const CommentSchema = require('../models/Comment');
require('dotenv').config();
const mongoose = require('mongoose');

const createDatabase = require('./createTestAcc');

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await UserSchema.deleteMany();
    await PostSchema.deleteMany();
    await CommentSchema.deleteMany();

    createDatabase();
    console.log('Success');
  } catch (error) {
    console.log(error);
  }
};

start();
