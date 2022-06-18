import React from 'react';
import timeFormat from '../utils/timeFormat';
import Avatar from './Avatar';
import { FaStar } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
const UserInfo = ({ profilePic, _id: userId, username, email, createdAt }) => {
  const { state } = useAppContext();

  if (username && username.length > 14) {
    username = username.slice(0, 14) + '...';
  }

  if (email && email.length > 14) {
    email = email.slice(0, 14) + '...';
  }
  return (
    <>
      <Avatar src={profilePic} />
      <hgroup>
        <a href={`/user/${userId}`}>
          <h6>
            {userId === state.user._id && (
              <FaStar
                color='#d81b60'
                style={{
                  width: '18px',
                }}
              />
            )}
            {username}
          </h6>
        </a>
        {email && <small>{email}</small>}
        {createdAt && <small>{timeFormat(createdAt)}</small>}
      </hgroup>
    </>
  );
};

export default UserInfo;
