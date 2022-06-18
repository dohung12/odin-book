const express = require('express');
const router = express.Router();
const {
  updateProfile,
  updatePassword,
  getUserProfile,
  removeUser,
} = require('../controllers/userController');

const {
  createFriendRequest,
  responseFriendRequest,
  revokeFriendRequest,
  unfriend,
  suggestNewFriend,
} = require('../controllers/friendController');

router.route('/:id').get(getUserProfile);
router.route('/profile').patch(updateProfile);
router.route('/password').patch(updatePassword);
router.route('/').delete(removeUser);
/**
 * FRIEND ROUTE
 */
router.route('/friend/').post(createFriendRequest);
router.route('/friend/revoke').patch(revokeFriendRequest);
router.route('/friend/response').patch(responseFriendRequest);
router.route('/friend/unfriend').patch(unfriend);
router.route('/friend/suggestNewFriend').get(suggestNewFriend);

module.exports = router;
