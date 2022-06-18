const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please provide post content'],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide post author'],
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', PostSchema);
