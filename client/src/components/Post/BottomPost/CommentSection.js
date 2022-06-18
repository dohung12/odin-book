import React from 'react';
import NewCommentForm from '../../NewCommentForm';
import SingleComment from '../../SingleComment';

const CommentSection = ({ postId, comments, showAllComments }) => {
  if (comments.length > 3 && !showAllComments) {
    comments = comments.slice(0, 3);
  }

  return (
    <>
      <NewCommentForm postId={postId} />
      {comments.map((comment) => {
        return <SingleComment key={comment._id} {...comment} postId={postId} />;
      })}
      {!showAllComments && <a href={`/post/${postId}`}>Show more comments</a>}
    </>
  );
};

export default CommentSection;
