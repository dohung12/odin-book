import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/appContext';
import UserInfoBlock from './UserInfoBlock';
import UserPost from './UserPost';
import FriendListBlock from './FriendListBlock/';
import { NewPostForm, FriendRequestToMe } from '../../components/';
import { useUserProfile } from '../../hooks';

const Wrapper = styled.section`
  /* .info-column {
    display: none;
  } */

  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 3fr 1fr;
    .info-column {
      display: flex;
    }
  }

  background-color: #eff3f6 !important;
  gap: 1rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Profile = () => {
  const { state } = useAppContext();
  const fetchUser = useUserProfile();
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Wrapper>
      <div>
        <NewPostForm />
        <UserPost />
      </div>
      <div className='info-column'>
        <UserInfoBlock {...state.user} />
        <FriendRequestToMe requestToMe={state.user.friends.requestToMe} />
        <FriendListBlock friendList={state.user.friends.accepted} />
      </div>
    </Wrapper>
  );
};

export default Profile;
