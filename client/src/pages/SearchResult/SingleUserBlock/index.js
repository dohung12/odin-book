import React from 'react';
import styled from 'styled-components';
import AddFriendBlock from './AddFriendBtn';
import Avatar from '../../../components/Avatar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
  hgroup {
    margin: 0;
    padding: 0;
    small {
      color: var(--secondary);
    }

    h6 {
      color: var(--primary);
      text-transform: capitalize;
      margin: 0;
    }

    min-width: 200px;
  }

  button {
    margin-bottom: 0;
    width: auto;
  }
`;

const UserInfo = ({ profilePic, _id: userId, username, email }) => {
  return (
    <Wrapper>
      <Avatar src={profilePic} />
      <hgroup>
        <a href={`/user/${userId}`}>
          <h6>{username}</h6>
        </a>
        <small>{email}</small>
      </hgroup>

      <AddFriendBlock userId={userId} />
    </Wrapper>
  );
};

export default UserInfo;
