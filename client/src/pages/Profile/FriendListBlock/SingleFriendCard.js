import { useState, useEffect } from 'react';
import { useAuthFetch } from '../../../hooks';
import Wrapper from '../../../assets/Wrapper/UserInfoBlockWrapper';
import UserInfo from '../../../components/UserInfo';
import UnfriendBtn from '../../../components/FriendshipButton/UnfriendBtn';
const SingleFriendCard = ({ targetUserId }) => {
  const [values, setValues] = useState(null);
  const authFetch = useAuthFetch();
  const [isLoading, setIsLoading] = useState(false);

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
            profilePic={values.profilePic}
            username={values.username}
            email={values.email}
          />
          <UnfriendBtn targetUserId={targetUserId} showText={false} />
        </>
      )}
    </Wrapper>
  );
};

export default SingleFriendCard;
