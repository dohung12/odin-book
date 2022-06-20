import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserInfo from '../../../components/UserInfo';
import UserInfoWrapper from '../../../assets/Wrapper/UserInfoBlockWrapper';

const Wrapper = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.5rem;

  :hover {
    background-color: #dfe8ee;
  }

  .link {
    display: block;
    text-align: end;
  }
`;

const SinglePost = ({ author, createdAt, content, postId }) => {
  const { username, profilePic, _id: authorId } = author;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${postId}`);
  };

  if (content.length > 200) {
    content = content.slice(0, 200) + '...';
  }

  return (
    <Wrapper onClick={handleClick}>
      <UserInfoWrapper>
        <UserInfo
          _id={authorId}
          createdAt={createdAt}
          profilePic={profilePic}
          username={username}
        />
      </UserInfoWrapper>
      <p className='content'>{content}</p>
      <a href={`/post/${postId}`} className='link'>
        Click to view full post
      </a>
    </Wrapper>
  );
};

export default SinglePost;
