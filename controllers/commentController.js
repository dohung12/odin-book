const CommentSchema = require('../models/Comment');
const PostSchema = require('../models/Post');
const { StatusCodes } = require('http-status-codes');
const checkPermission = require('../utils/checkPermission');

const createComment = async (req, res) => {
  const { userId } = req.user;
  // check if input fields empty
  const { content } = req.body;
  if (!content) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Please provide comment content',
    });
  }

  // find post that comment attach to
  const { postId } = req.params;
  const post = await PostSchema.findById(postId);
  if (!post) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `Post with ID ${postId} doesn't exist`,
    });
  }

  // create new comment document
  req.body.author = userId;
  const comment = await CommentSchema.create(req.body);
  await comment.populate('author');
  // add new comment to post's comment field
  post.comments.push(comment);
  await post.save();

  res.status(StatusCodes.CREATED).json({
    success: true,
    comment,
  });
};

const updateComment = async (req, res) => {
  const { commentId } = req.params;

  // check if empty input fields
  const { content } = req.body;
  if (!content) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Please provide comment content',
    });
  }

  // find comment
  const comment = await CommentSchema.findById(commentId);
  if (!comment) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `comment with ID ${commentId} doesn't exist`,
    });
  }

  // check permission to update post
  const permission = checkPermission(req.user.userId, comment.author);
  if (!permission) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      msg: 'Not authorized to access this route',
    });
  }
  // success, update post
  comment.content = content;
  await comment.save();

  res.status(StatusCodes.OK).json({
    success: true,
    comment,
  });
};

const deleteComment = async (req, res) => {
  const { commentId, postId } = req.params;

  // check if empty input fields
  const { userId } = req.user;

  // find comment
  const comment = await CommentSchema.findById(commentId);
  if (!comment) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `comment with ID ${commentId} doesn't exist`,
    });
  }

  // find post
  const post = await PostSchema.findById(postId);
  if (!post) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `post with ID ${commentId} doesn't exist`,
    });
  }

  // check permission to update post
  const permission = checkPermission(userId, comment.author);
  if (!permission) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      msg: 'Not authorized to access this route',
    });
  }

  // success, remove comment ref in post, remove comment
  await PostSchema.findByIdAndUpdate(postId, {
    $pull: {
      comments: commentId,
    },
  });
  await CommentSchema.findByIdAndRemove(commentId);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Successfully remove comment',
  });
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
