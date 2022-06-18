import React from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import styled from 'styled-components';
import LikeBtn from '../../LikeBtn';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
  border-top: 1px solid var(--secondary);
  border-bottom: 1px solid var(--secondary);
  margin-bottom: 1rem;

  div {
    margin: 0.25rem 0;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    border-color: transparent;
    padding: 5px 1.5rem;
    p {
      font-size: 16px;
      align-self: center;
      font-weight: bold;
      margin-bottom: 0;
      display: none;
      @media (min-width: 992px) {
        display: block;
      }
    }
  }

  div:hover {
    border-color: var(--secondary);
  }
`;

const InteractiveButtons = ({
  likes,
  postId,
  toggleShowComments,
  showCommentSection,
}) => {
  return (
    <Wrapper>
      <LikeBtn likes={likes} postId={postId} />
      <div
        role={'button'}
        className='outline secondary'
        onClick={toggleShowComments}
      >
        {showCommentSection ? (
          <FaCommentAlt color='#5d8aa8' />
        ) : (
          <FaCommentAlt />
        )}
        <p>Comment</p>
      </div>
    </Wrapper>
  );
};

export default InteractiveButtons;
