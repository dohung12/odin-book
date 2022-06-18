import Wrapper from './Wrapper';
import TopPost from './TopPost/';
import BottomPost from './BottomPost';

const Post = ({
  content,
  author,
  comments,
  likes,
  createdAt,
  _id,
  showComments,
  showAllComments,
}) => {
  return (
    <Wrapper>
      <TopPost
        content={content}
        createdAt={createdAt}
        author={author}
        postId={_id}
      />
      <BottomPost
        comments={comments}
        likes={likes}
        postId={_id}
        showComments={showComments}
        showAllComments={showAllComments}
      />
    </Wrapper>
  );
};

export default Post;
