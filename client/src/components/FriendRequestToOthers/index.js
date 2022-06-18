import styled from 'styled-components';
import SingleRequest from './SingleRequest';

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const FriendRequestToOthers = ({ requestToOthers }) => {
  return (
    <Wrapper>
      <h6>People who you already sent friend request.</h6>
      {requestToOthers.map((item) => {
        if (typeof item === 'string') {
          return <SingleRequest key={item} targetUserId={item} />;
        } else {
          return <SingleRequest key={item._id} targetUserId={item._id} />;
        }
      })}
    </Wrapper>
  );
};

export default FriendRequestToOthers;
