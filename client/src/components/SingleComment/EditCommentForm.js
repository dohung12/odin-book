import { useAuthFetch, useUpdatePosts } from '../../hooks';

const EditCommentForm = ({ values, setValues, state, postId, commentId }) => {
  const authFetch = useAuthFetch();
  const updatePosts = useUpdatePosts();

  const updateEditComment = () => {
    const posts = state.posts.map((post) => {
      // find post by postId
      if (post._id === postId) {
        post.comments.map((item) => {
          if (item._id === commentId) {
            item.content = values.commentContent;
          }
          return item;
        });
      }
      return post;
    });
    updatePosts(posts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, isLoading: true });
    try {
      const { data } = await authFetch.patch(
        `/post/${postId}/comment/${commentId}`,
        { content: values.commentContent }
      );
      setValues({ ...values, commentContent: data.comment.content });
      updateEditComment();
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setValues({ ...values, isEditing: false, isLoading: false });
  };
  return (
    <form action='' onSubmit={handleSubmit}>
      <input
        type='text'
        value={values.commentContent}
        onChange={(e) => {
          setValues({ ...values, commentContent: e.target.value });
        }}
      />
    </form>
  );
};

export default EditCommentForm;
