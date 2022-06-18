const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please provide comment content'],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide comment author'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', CommentSchema);
