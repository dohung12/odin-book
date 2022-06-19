import Wrapper from '../../assets/Wrapper/IndependenceBlockWrapper';
import SingleRequest from './SingleRequest';

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
