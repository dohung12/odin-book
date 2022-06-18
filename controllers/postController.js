const PostSchema = require('../models/Post');
const UserSchema = require('../models/User');
const CommentSchema = require('../models/Comment');
const checkPermission = require('../utils/checkPermission');
const { StatusCodes } = require('http-status-codes');

const getAllPosts = async (req, res) => {
  // get user
  const { userId } = req.user;
  const user = await UserSchema.findById(userId);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `User with ID ${userId} not found`,
    });
  }

  // get post from user and all friends in friend list
  const authors = [...user.friends.accepted, user];
  const posts = await PostSchema.find({
    author: {
      $in: authors,
    },
  })
    .sort({ createdAt: -1 })
    .populate('author comments likes')
    .populate({
      path: 'comments',
      populate: { path: 'author' },
    });

  res.status(200).json({ count: posts.length, posts });
};

const getSinglePost = async (req, res) => {
  const { postId } = req.params;

  // FIND POST
  const post = await PostSchema.findById(postId)
    .populate('author comments likes')
    .populate({
      path: 'comments',
      populate: { path: 'author' },
    });

  res.status(200).json({ post });
};

const getUserPosts = async (req, res) => {
  // get posts from one user, current user or not.
  // get user from db
  const { id } = req.query;
  const user = await UserSchema.findById(id);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `User with ID ${id} not found`,
    });
  }

  // get post from user and all friends in friend list
  // sort by latest first
  const posts = await PostSchema.find({ author: user })
    .sort({ createdAt: -1 })
    .populate('author comments likes')
    .populate({
      path: 'comments',
      populate: { path: 'author' },
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

  res.status(200).json({ count: posts.length, posts });
};

const createPost = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Please provide post content',
    });
  }

  req.body.author = req.user.userId;
  const post = await PostSchema.create(req.body);
  await post.populate('author');
  res.status(StatusCodes.CREATED).json({
    success: true,
    post,
  });
};

const updatePost = async (req, res) => {
  const { postId } = req.params;

  // check if empty input fields
  const { content } = req.body;
  if (!content) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Please provide post content',
    });
  }

  // find post
  const post = await PostSchema.findById(postId);
  if (!post) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `Post with ID ${postId} doesn't exist`,
    });
  }

  // check permission to update post
  const permission = checkPermission(req.user.userId, post.author);
  if (!permission) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      msg: 'Not authorized to access this route',
    });
  }
  // success, update post
  post.content = content;
  await post.save();

  res.status(StatusCodes.OK).json({
    success: true,
    post,
  });
};

const deletePost = async (req, res) => {
  const { postId } = req.params;

  // find post
  const post = await PostSchema.findById(postId);
  if (!post) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `Post with ID ${postId} doesn't exist`,
    });
  }
  // check permission to delete post
  const permission = checkPermission(req.user.userId, post.author);
  if (!permission) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      msg: 'Not authorized to access this route',
    });
  }
  // remove all post's comments
  post.comments.forEach(async (commentId) => {
    await CommentSchema.findByIdAndRemove(commentId);
  });

  // success, remove post
  await post.remove();

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Successfully remove post',
  });
};

const toggleLikeStatus = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user;
  // find post
  const post = await PostSchema.findById(postId);
  if (!post) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `Post with ID ${postId} doesn't exist`,
    });
  }
  const user = await UserSchema.findById(userId);
  // check if user is in post's liked list
  const liked = post.likes.includes(userId);
  if (liked) {
    // if already liked, unlike
    await post.updateOne({
      $pull: {
        likes: userId,
      },
    });
  } else {
    // if not, like post
    post.likes.push(user);
    await post.save();
  }

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Success',
  });
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  toggleLikeStatus,
  getUserPosts,
  getSinglePost,
};
