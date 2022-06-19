import { useEffect } from 'react';
import styled from 'styled-components';
import { NewPostForm } from '../../components/';
import { useUserProfile } from '../../hooks';
import DashboardPost from './DashboardPost';
import NewFriendColumn from './NewFriendColumn';

const Wrapper = styled.section`
  .new-friend-column {
    display: none;
  }
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 3fr 1fr;
    .new-friend-column {
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

const Dashboard = () => {
  const fetchUser = useUserProfile();
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Wrapper>
      <div>
        <NewPostForm />
        <DashboardPost />
      </div>
      <NewFriendColumn />
    </Wrapper>
  );
};

export default Dashboard;
