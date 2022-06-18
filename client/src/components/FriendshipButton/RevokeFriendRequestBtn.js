import { useState } from 'react';
import { useAuthFetch, useUpdateUser } from '../../hooks';
import { FaTimesCircle } from 'react-icons/fa';

const RevokeFriendRequestBtn = ({ targetUserId, showText }) => {
  const authFetch = useAuthFetch();
  const updateUser = useUpdateUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.patch('/user/friend/revoke', {
        targetUserId,
      });
      updateUser(data.user);
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setIsLoading(false);
  };
  return (
    <button onClick={handleClick} disabled={isLoading} aria-busy={isLoading}>
      {showText ? 'Revoke' : <FaTimesCircle color='white' />}
    </button>
  );
};

export default RevokeFriendRequestBtn;
