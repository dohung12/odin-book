import { useAuthFetch, useUpdatePosts } from '../../hooks';

const DelBtn = ({ postId, commentId, setValues, state, values }) => {
  const authFetch = useAuthFetch();
  const updatePosts = useUpdatePosts();

  const updateDelComment = () => {
    const posts = state.posts.map((post) => {
      // find post by postId
      if (post._id === postId) {
        post.comments = post.comments.filter(
          (comment) => comment._id !== commentId
        );
      }
      return post;
    });
    updatePosts(posts);
  };

  const handleDelBtn = async () => {
    setValues({ ...state, isLoading: true });
    try {
      await authFetch.delete(`/post/${postId}/comment/${commentId}`);
      updateDelComment();
    } catch (error) {
      const { msg } = error.response.data;
      console.log(msg);
    }
    setValues({ ...state, isLoading: false });
  };
  return (
    <div
      role={'button'}
      className='outline contrast'
      onClick={handleDelBtn}
      disabled={values.isLoading}
    >
      Delete
    </div>
  );
};

export default DelBtn;
