import { useState } from 'react';
import { useAuthFetch, useUpdateUser } from '../../hooks';
import { FaPlus } from 'react-icons/fa';
import UserInfo from '../UserInfo';
import Wrapper from '../../assets/Wrapper/UserInfoBlockWrapper';

const SingleFriendRequest = ({ profilePic, username, email, _id }) => {
  const authFetch = useAuthFetch();
  const [isLoading, setIsLoading] = useState(false);
  const updateUser = useUpdateUser();
  /**
   * HANDLE FRIEND REQUEST'S RESPONSE BUTTONS
   */
  const handleClick = async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.post('/user/friend', {
        targetUserId: _id,
      });
      updateUser(data.user);
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setIsLoading(false);
  };

  return (
    <Wrapper aria-busy={isLoading} className='user-info'>
      <UserInfo
        _id={_id}
        profilePic={profilePic}
        username={username}
        email={email}
      />
      <button
        disabled={isLoading}
        aria-busy={isLoading}
        onClick={handleClick}
        style={{
          backgroundColor: '#43a047',
          borderColor: '#43a047',
        }}
      >
        <FaPlus color='#fff' />
      </button>
    </Wrapper>
  );
};

export default SingleFriendRequest;
