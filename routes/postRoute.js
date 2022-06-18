const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
  toggleLikeStatus,
  getUserPosts,
  getSinglePost,
} = require('../controllers/postController');
const {
  createComment,
  deleteComment,
  updateComment,
} = require('../controllers/commentController');

router.route('/').post(createPost).get(getAllPosts);
router.route('/user').get(getUserPosts);

router
  .route('/:postId')
  .patch(updatePost)
  .delete(deletePost)
  .get(getSinglePost);

router.route('/:postId/comment').post(createComment);
router
  .route('/:postId/comment/:commentId')
  .patch(updateComment)
  .delete(deleteComment);

router.route('/:postId/like').post(toggleLikeStatus);

module.exports = router;
