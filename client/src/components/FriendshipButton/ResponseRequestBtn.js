import React from 'react';
import { useState } from 'react';
import { useAuthFetch, useUpdateUser } from '../../hooks';
import { FaCheck, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const ResponseRequestBtn = ({ targetUserId, showText }) => {
  const authFetch = useAuthFetch();
  const updateUser = useUpdateUser();
  const [isLoading, setIsLoading] = useState(false);

  const requestResponse = async (response) => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.patch('/user/friend/response', {
        targetUserId,
        response,
      });
      updateUser(data.user);
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setIsLoading(false);
  };

  const handleAccept = () => {
    requestResponse(true);
  };
  const handleDecline = () => {
    requestResponse(false);
  };
  return (
    <div className='grid'>
      <div role={'button'} onClick={handleAccept} disabled={isLoading}>
        {showText ? 'Accept' : <FaCheck color='white' />}
      </div>
      <div
        role={'button'}
        className='contrast'
        onClick={handleDecline}
        disabled={isLoading}
      >
        {showText ? 'Decline' : <FaTimes color='white' />}
      </div>
    </div>
  );
};

export default ResponseRequestBtn;
