import styled from 'styled-components';
import SingleRequest from './SingleRequest';

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const FriendRequestToMe = ({ requestToMe }) => {
  return (
    <Wrapper>
      <h6>People who wants to be friend with you.</h6>
      {requestToMe.map((_id) => {
        return <SingleRequest key={_id} targetUserId={_id} />;
      })}
    </Wrapper>
  );
};

export default FriendRequestToMe;
