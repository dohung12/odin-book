import styled from 'styled-components';
import { useAppContext } from '../../context/appContext';
import {
  AddFriendBtn,
  RevokeFriendRequestBtn,
  ResponseRequestBtn,
  UnfriendBtn,
} from '../../components/FriendshipButton/';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  height: min-content;
  margin-top: 1rem;
`;

const AddFriendBlock = ({ userId: targetUserId }) => {
  const { state } = useAppContext();
  const { accepted, requestToMe, requestToOthers } = state.user.friends;

  // PAGE'S USER AND CURRENT USER RELATIONSHIP IS:

  // ALREADY BEING FRIEND
  // DISPLAY UNFRIEND BTN
  if (accepted.some((id) => id === targetUserId)) {
    return (
      <Wrapper>
        <UnfriendBtn targetUserId={targetUserId} showText={true} />
      </Wrapper>
    );
  }
  // USER SENT A FRIEND REQUEST TO CURRENT USER
  // DISPLAY RESPONSE BUTTONS
  else if (requestToMe.some((id) => id === targetUserId)) {
    return (
      <Wrapper>
        <h4>Response to user's friend request</h4>
        <ResponseRequestBtn targetUserId={targetUserId} showText={true} />
      </Wrapper>
    );
  }
  // CURRENT USER SENT A FRIEND REQUEST TO TARGET USER
  // DISPLAY REVOKE REQUEST BUTTON
  else if (requestToOthers.some((id) => id === targetUserId)) {
    return (
      <Wrapper>
        <h4>You'd already sent friend request</h4>
        <RevokeFriendRequestBtn targetUserId={targetUserId} showText={true} />
      </Wrapper>
    );
  }
  // ELSE
  // DISPLAY A ADD FRIEND BUTTON
  else {
    return (
      <Wrapper>
        <h4>Let's make a new friend.</h4>
        <AddFriendBtn showText={true} targetUserId={targetUserId} />
      </Wrapper>
    );
  }
};

export default AddFriendBlock;
