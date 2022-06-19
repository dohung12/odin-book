const express = require('express');
const router = express.Router();
const { searchPosts, searchUsers } = require('../controllers/searchController');

router.route('/posts').get(searchPosts);
router.route('/users').get(searchUsers);

module.exports = router;
