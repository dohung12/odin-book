import React from 'react';
import styled from 'styled-components';
import SingleFriendCard from './SingleFriendCard';

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const FriendListBlock = ({ friendList }) => {
  return (
    <Wrapper>
      <h6>Friends list</h6>
      {friendList.length === 0 && <h6>Friend list is empty</h6>}

      {friendList.map((_id) => {
        return <SingleFriendCard key={_id} targetUserId={_id} />;
      })}
    </Wrapper>
  );
};

export default FriendListBlock;
