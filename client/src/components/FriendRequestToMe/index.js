import SingleRequest from './SingleRequest';
import Wrapper from '../../assets/Wrapper/IndependenceBlockWrapper';

const FriendRequestToMe = ({ requestToMe }) => {
  const showDetail = window.innerWidth > 992;
  return (
    <Wrapper open={showDetail}>
      <summary>Response to friend requests</summary>
      {requestToMe.map((_id) => {
        return <SingleRequest key={_id} targetUserId={_id} />;
      })}
    </Wrapper>
  );
};

export default FriendRequestToMe;
