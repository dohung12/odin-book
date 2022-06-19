import { FaComments } from 'react-icons/fa';
import { IoHeartCircleSharp } from 'react-icons/io5';
import Wrapper from '../../../assets/Wrapper/InteractInfoWrapper';

const InteractInfo = ({ likes, comments }) => {
  const likesCount = likes.length;
  const commentsCount = comments.length;
  return (
    <Wrapper>
      <div>
        {likesCount > 0 ? (
          <IoHeartCircleSharp color=' #43a047' />
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
