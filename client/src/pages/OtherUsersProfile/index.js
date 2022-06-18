import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthFetch, useUserProfile } from '../../hooks/index';
import styled from 'styled-components';
import { useAppContext } from '../../context/appContext';
import UserInfoBlock from './UserInfoBlock';
import AddFriendBtn from './AddFriendBtn';
import UserPost from './UserPost';
const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;
  background-color: #eff3f6 !important;
  gap: 1rem;
`;

const OtherUsersPage = () => {
  const [notFound, setNotFound] = useState(false);
  const { userId } = useParams();
  const authFetch = useAuthFetch();
  const { state } = useAppContext();
  const fetchUser = useUserProfile();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // fetch user profile
  const fetchUserProfile = async () => {
    try {
      const { data } = await authFetch.get(`/user/${userId}`);
      setUser(data.user);
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        setNotFound(true);
      }
    }
  };

  useEffect(() => {
    // if visit user page is current user, navigate to profile page
    if (state.user._id === userId) {
      navigate('/profile');
    } else {
      fetchUserProfile();
    }
    fetchUser();
  }, [navigate]);

  return (
    <Wrapper>
      {notFound && (
        <>
          <h1>User you're looking for does not exist</h1>
        </>
      )}
      {!notFound && user && (
        <>
          <UserPost userId={userId} />
          <div className='aside'>
            <UserInfoBlock {...user} />
            <AddFriendBtn userId={userId} />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default OtherUsersPage;
