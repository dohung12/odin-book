import { useEffect, useState } from 'react';
import { useAuthFetch, useUpdateUser } from '../../hooks';
import { FaTimes } from 'react-icons/fa';
import UserInfo from '../UserInfo';
import Wrapper from '../../assets/Wrapper/UserInfoBlockWrapper';

const SingleFriendRequest = ({ targetUserId }) => {
  const authFetch = useAuthFetch();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({});
  const { profilePic, username, email } = values;
  const updateUser = useUpdateUser();
  /**
   * HANDLE FRIEND REQUEST'S BUTTONS
   */
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

  /**
   * GET FRIEND REQUEST SENDER DETAIL
   */

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.get(`/user/${targetUserId}`);
      setValues(data.user);
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Wrapper aria-busy={isLoading}>
      {values && (
        <>
          <UserInfo
            _id={targetUserId}
            profilePic={profilePic}
            username={username}
            email={email}
          />
          <button
            onClick={handleClick}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            <FaTimes color='#fff' />
          </button>
        </>
      )}
    </Wrapper>
  );
};

export default SingleFriendRequest;
