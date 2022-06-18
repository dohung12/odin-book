import { useState } from 'react';
import { useAuthFetch, useUpdateUser } from '../../hooks';
import { FaPlus } from 'react-icons/fa';

const AddFriendBtn = ({ targetUserId, showText }) => {
  const authFetch = useAuthFetch();
  const updateUser = useUpdateUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.post('/user/friend', {
        targetUserId,
      });
      updateUser(data.user);
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setIsLoading(false);
  };
  return (
    <button disabled={isLoading} aria-busy={isLoading} onClick={handleClick}>
      {showText ? 'Add Friend' : <FaPlus />}
    </button>
  );
};

export default AddFriendBtn;
