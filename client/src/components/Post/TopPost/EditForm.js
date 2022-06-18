import React from 'react';
import { useAppContext } from '../../../context/appContext';
import { useAuthFetch } from '../../../hooks';

const EditForm = ({ values, setValues, postId, updatePosts }) => {
  const authFetch = useAuthFetch();
  const { state } = useAppContext();
  const { postContent } = values;

  const updateEditPost = () => {
    const posts = state.posts.map((post) => {
      if (post._id === postId) {
        post.content = postContent;
      }
      return post;
    });
    updatePosts(posts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({
      ...values,
      isLoading: true,
    });
    try {
      const { data } = await authFetch.patch(`/post/${postId}`, {
        content: postContent,
      });
      setValues({ ...values, postContent: data.post.content });
      updateEditPost();
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setValues({
      ...values,
      isLoading: false,
      isEditing: false,
    });
  };
  return (
    <form action='' onSubmit={handleSubmit}>
      <input
        type='text'
        value={postContent}
        onChange={(e) =>
          setValues({
            ...values,
            postContent: e.target.value,
          })
        }
      />
    </form>
  );
};

export default EditForm;
