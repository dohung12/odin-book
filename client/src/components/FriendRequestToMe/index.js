import SingleRequest from './SingleRequest';
import Wrapper from '../../assets/Wrapper/IndependenceBlockWrapper';

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
