import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthorInfo from './AuthorInfo';
const Wrapper = styled.div`
  .content {
    margin-bottom: 0;
  }
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const SinglePost = ({ author, createdAt, content, postId }) => {
  const { username, profilePic, _id: authorId } = author;
  const postInfo = { profilePic, authorId, createdAt, username };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${postId}`);
  };

  return (
    <Wrapper href={`/post/${postId}`} onClick={handleClick}>
      <AuthorInfo {...postInfo} />
      <p className='content'>{content}</p>
    </Wrapper>
  );
};

export default SinglePost;
