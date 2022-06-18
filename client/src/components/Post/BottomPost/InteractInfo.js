import { FaComments } from 'react-icons/fa';
import { IoHeartCircleSharp } from 'react-icons/io5';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.5rem 0;

  div {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    p {
      margin-bottom: 0;
      font-size: 16px;
    }
  }
`;

const InteractInfo = ({ likes, comments }) => {
  const likesCount = likes.length;
  const commentsCount = comments.length;
  return (
    <Wrapper>
      <div>
        {likesCount > 0 ? (
          <IoHeartCircleSharp color='#d81b60' />
        ) : (
          <IoHeartCircleSharp />
        )}
        <p>{`${likesCount} like${likesCount > 1 ? 's' : ''}`}</p>
      </div>
      <div>
        {commentsCount > 0 ? <FaComments color='#5d8aa8' /> : <FaComments />}
        <p>{`${commentsCount} comment${commentsCount > 1 ? 's' : ''}`}</p>
      </div>
    </Wrapper>
  );
};

export default InteractInfo;
