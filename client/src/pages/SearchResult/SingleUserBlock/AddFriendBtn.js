import { useAppContext } from '../../../context/appContext';
import {
  AddFriendBtn,
  RevokeFriendRequestBtn,
  ResponseRequestBtn,
  UnfriendBtn,
} from '../../../components/FriendshipButton/';

const AddFriendBlock = ({ userId: targetUserId }) => {
  const { state } = useAppContext();
  const { accepted, requestToMe, requestToOthers } = state.user.friends;

  // PAGE'S USER AND CURRENT USER RELATIONSHIP IS:

  // ALREADY BEING FRIEND
  // DISPLAY UNFRIEND BTN
  if (accepted.some((id) => id === targetUserId)) {
    return <UnfriendBtn targetUserId={targetUserId} showText={true} />;
  }
  // USER SENT A FRIEND REQUEST TO CURRENT USER
  // DISPLAY RESPONSE BUTTONS
  else if (requestToMe.some((id) => id === targetUserId)) {
    return <ResponseRequestBtn targetUserId={targetUserId} showText={true} />;
  }
  // CURRENT USER SENT A FRIEND REQUEST TO TARGET USER
  // DISPLAY REVOKE REQUEST BUTTON
  else if (requestToOthers.some((id) => id === targetUserId)) {
    return (
      <RevokeFriendRequestBtn targetUserId={targetUserId} showText={true} />
    );
  }
  // ELSE
  // DISPLAY A ADD FRIEND BUTTON
  else {
    return <AddFriendBtn showText={true} targetUserId={targetUserId} />;
  }
};

export default AddFriendBlock;
