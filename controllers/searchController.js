const UserSchema = require('../models/User');
const PostSchema = require('../models/Post');

const searchPosts = async (req, res) => {
  const { search } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  const queryObj = {
    content: {
      $regex: search,
      $options: 'i',
    },
  };

  const posts = await PostSchema.find(queryObj)
    .sort({ createdAt: -1 })
    .populate('author')
    .skip(skip)
    .limit(limit);

  const totalPosts = await PostSchema.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalPosts / limit);
  res.status(200).json({ count: totalPosts, posts, numOfPages });
};

const searchUsers = async (req, res) => {
  const { search } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;
  const skip = (page - 1) * limit;

  const queryObj = {
    username: {
      $regex: search,
      $options: 'i',
    },
  };

  const users = await UserSchema.find(queryObj)
    .sort({ username: -1 })
    .skip(skip)
    .limit(limit);

  const totalUsers = await UserSchema.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalUsers / limit);
  res.status(200).json({ count: totalUsers, users, numOfPages });
};

module.exports = { searchPosts, searchUsers };
