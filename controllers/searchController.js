const UserSchema = require('../models/User');
const PostSchema = require('../models/Post');

const searchHandler = async (req, res) => {
  const { search } = req.query;
  const users = await UserSchema.find({
    username: {
      $regex: search,
      $options: 'i',
    },
  }).limit(10);

  const posts = await PostSchema.find({
    content: {
      $regex: search,
      $options: 'i',
    },
  })
    .populate('author')
    .limit(10);

  res.status(200).json({
    userCount: users.length,
    postCount: posts.length,
    users,
    posts,
  });
};

module.exports = { searchHandler };
