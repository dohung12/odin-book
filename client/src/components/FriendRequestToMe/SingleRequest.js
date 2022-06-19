import { useEffect, useState } from 'react';
import { useAuthFetch, useUpdateUser } from '../../hooks';
import { FaCheck, FaTimes } from 'react-icons/fa';
import UserInfo from '../UserInfo';
import Wrapper from '../../assets/Wrapper/UserInfoBlockWrapper';

const SingleFriendRequest = ({ targetUserId }) => {
  const authFetch = useAuthFetch();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({});
  const { profilePic, username, email } = values;
  const updateUser = useUpdateUser();
  /**
   * HANDLE FRIEND REQUEST'S RESPONSE BUTTONS
   */
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
    <Wrapper aria-busy={isLoading} className='user-info'>
      {values && (
        <>
          <UserInfo
            _id={targetUserId}
            profilePic={profilePic}
            username={username}
            email={email}
          />
          <div className='btn-container'>
            <div
              role={'button'}
              onClick={handleAccept}
              style={{
                backgroundColor: '#43a047',
                borderColor: '#43a047',
              }}
            >
              <FaCheck color='white' />
            </div>
            <div role={'button'} className='contrast' onClick={handleDecline}>
              <FaTimes color='white' />
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default SingleFriendRequest;
