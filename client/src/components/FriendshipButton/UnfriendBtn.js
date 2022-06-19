import { useState } from 'react';
import styled from 'styled-components';

import { FaUserSlash } from 'react-icons/fa';

import { useAuthFetch, useUpdateUser } from '../../hooks';

const Wrapper = styled.button`
  background-color: #e53935;
  border: 0;
`;
const UnfriendBtn = ({ targetUserId, showText }) => {
  const [isLoading, setIsLoading] = useState(false);
  const authFetch = useAuthFetch();
  const updateUser = useUpdateUser();
  const handleClick = async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.patch('/user/friend/unfriend', {
        targetUserId,
      });
      updateUser(data.user);
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setIsLoading(false);
  };
  return (
    <Wrapper disabled={isLoading} onClick={handleClick}>
      {showText ? 'Unfriend' : <FaUserSlash color='white' />}
    </Wrapper>
  );
};

export default UnfriendBtn;
