import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/appContext';
import UserInfoBlock from './UserInfoBlock';
import UserPost from './UserPost';
import FriendListBlock from './FriendListBlock/';
import { NewPostForm, FriendRequestToMe } from '../../components/';
import { useUserProfile } from '../../hooks';

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;
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
      {/* <div></div> */}
      <div>
        <NewPostForm />
        <UserPost />
      </div>
      <div>
        <UserInfoBlock {...state.user} />
        <FriendRequestToMe requestToMe={state.user.friends.requestToMe} />
        <FriendListBlock friendList={state.user.friends.accepted} />
      </div>
    </Wrapper>
  );
};

export default Profile;
