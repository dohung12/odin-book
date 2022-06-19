import Wrapper from '../../assets/Wrapper/IndependenceBlockWrapper';
import SingleRequest from './SingleRequest';

const FriendRequestToOthers = ({ requestToOthers }) => {
  const showDetail = window.innerWidth > 992;
  return (
    <Wrapper open={showDetail}>
      <summary>Already sent friend request</summary>
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
