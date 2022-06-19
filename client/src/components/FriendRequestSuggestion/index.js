import Wrapper from '../../assets/Wrapper/IndependenceBlockWrapper';
import SingleRequest from './SingleRequest';

const FriendRequestSuggestion = ({ requestSuggestion }) => {
  const showDetail = window.innerWidth > 992;

  return (
    <Wrapper open={showDetail}>
      <summary>People you may know</summary>
      {requestSuggestion.map((user) => {
        return <SingleRequest key={user._id} {...user} />;
      })}
    </Wrapper>
  );
};

export default FriendRequestSuggestion;
