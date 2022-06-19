import React from 'react';
import SingleFriendCard from './SingleFriendCard';
import Wrapper from '../../../assets/Wrapper/IndependenceBlockWrapper';

const FriendListBlock = ({ friendList }) => {
  return (
    <Wrapper open={window.innerWidth > 992}>
      <summary>Friends list</summary>
      {friendList.length === 0 && <h6>Friend list is empty</h6>}

      {friendList.map((_id) => {
        return <SingleFriendCard key={_id} targetUserId={_id} />;
      })}
    </Wrapper>
  );
};

export default FriendListBlock;
