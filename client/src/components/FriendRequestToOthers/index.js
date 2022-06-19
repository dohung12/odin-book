import Wrapper from '../../assets/Wrapper/IndependenceBlockWrapper';
import SingleRequest from './SingleRequest';

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
