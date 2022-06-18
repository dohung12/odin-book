import styled from 'styled-components';
import SingleRequest from './SingleRequest';

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const FriendRequestSuggestion = ({ requestSuggestion }) => {
  return (
    <Wrapper>
      <h6>People you may know.</h6>
      {requestSuggestion.map((user) => {
        return <SingleRequest key={user._id} {...user} />;
      })}
    </Wrapper>
  );
};

export default FriendRequestSuggestion;
