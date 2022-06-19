import { useState } from 'react';
import styled from 'styled-components';
import CommentSection from './CommentSection';
import InteractInfo from './InteractInfo';
import InteractiveButtons from './InteractiveButtons';

const BottomCard = ({
  likes,
  comments,
  postId,
  showComments = false,
  showAllComments = false,
}) => {
  const [showCommentSection, setShowCommentSection] = useState(showComments);

  const toggleShowComments = () => {
    setShowCommentSection(!showCommentSection);
  };

  return (
    <div>
      <InteractInfo comments={comments} likes={likes} />
      <InteractiveButtons
        likes={likes}
        postId={postId}
        showCommentSection={showCommentSection}
        toggleShowComments={toggleShowComments}
      />
      {showCommentSection && (
        <CommentSection
          postId={postId}
          comments={comments}
          showAllComments={showAllComments}
        />
      )}
    </div>
  );
};

export default BottomCard;
