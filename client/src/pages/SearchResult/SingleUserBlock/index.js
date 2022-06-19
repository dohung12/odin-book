import React from 'react';
import AddFriendBlock from './AddFriendBtn';
import Wrapper from '../../../assets/Wrapper/UserInfoBlockWrapper';
import UserInfo from '../../../components/UserInfo';

const SingleUser = ({ profilePic, _id: userId, username, email }) => {
  return (
    <Wrapper>
      <UserInfo
        profilePic={profilePic}
        _id={userId}
        username={username}
        email={email}
      />
      {/* <AddFriendBlock userId={userId} /> */}
    </Wrapper>
  );
};

export default SingleUser;
