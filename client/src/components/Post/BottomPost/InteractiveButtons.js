import { FaCommentAlt } from 'react-icons/fa';
import Wrapper from '../../../assets/Wrapper/InteractiveButtonWrapper';
import LikeBtn from '../../LikeBtn';

const InteractiveButtons = ({
  likes,
  postId,
  toggleShowComments,
  showCommentSection,
}) => {
  return (
    <Wrapper>
      <LikeBtn likes={likes} postId={postId} />
      <div
        role={'button'}
        className='outline secondary'
        onClick={toggleShowComments}
      >
        {showCommentSection ? (
          <FaCommentAlt color='#5d8aa8' />
        ) : (
          <FaCommentAlt />
        )}
        <p>Comment</p>
      </div>
    </Wrapper>
  );
};

export default InteractiveButtons;
