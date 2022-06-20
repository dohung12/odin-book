import React from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import Wrapper from '../../../assets/Wrapper/UserInfoBlockWrapper';
import UserInfo from '../../../components/UserInfo';
const SingleUser = ({ profilePic, _id: userId, username, email }) => {
  return (
    <>
      <Wrapper>
        <UserInfo
          profilePic={profilePic}
          _id={userId}
          username={username}
          email={email}
        />
        <a href={`/user/${userId}`}>
          <FaLocationArrow color='#5d8aa8' />
        </a>
      </Wrapper>
    </>
  );
};

export default SingleUser;
