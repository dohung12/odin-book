import React from 'react';
import styled from 'styled-components';
import timeFormat from '../../utils/timeFormat';
import Avatar from '../Avatar';

const PostWrapper = styled.div`
  .author {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    h6 {
      color: var(--primary);
      text-transform: capitalize;
      margin: 0;
    }
    small {
      color: #9ca3af;
    }
  }

  p {
    margin-bottom: 0;
  }

  padding: 1rem !important;
  border: 1px solid #ccc !important;
`;

const Wrapper = styled.dialog`
  article {
    width: 80%;
  }
`;

const Modal = ({ dataTarget, showModal, toggleModal, onConfirm, postInfo }) => {
  const { profilePic, authorId, username, createdAt, postContent } = postInfo;

  return (
    <Wrapper open={showModal}>
      <article>
        <a
          href='#close'
          aria-label='Close'
          className='close'
          data-target={dataTarget}
          onClick={toggleModal}
        ></a>
        <hgroup>
          <h2>Remove Confirmation!</h2>
          <p>Do you want to remove this post?</p>
        </hgroup>
        <PostWrapper>
          <div className='author'>
            <Avatar src={profilePic} />
            <hgroup>
              <a href={`/user/${authorId}`}>
                <h6>{username}</h6>
              </a>
              <small>{timeFormat(createdAt)}</small>
            </hgroup>
          </div>
          <p>{postContent}</p>
        </PostWrapper>
        <footer>
          <a
            href='#cancel'
            role='button'
            className='secondary'
            data-target={dataTarget}
            onClick={toggleModal}
          >
            Cancel
          </a>
          <a
            href='#confirm'
            role='button'
            data-target={dataTarget}
            onClick={onConfirm}
          >
            Confirm
          </a>
        </footer>
      </article>
    </Wrapper>
  );
};

export default Modal;
