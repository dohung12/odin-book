import React, { useState } from 'react';
import { useAppContext } from '../context/appContext';
import { useAlert } from '../hooks';
import useAuthFetch from '../hooks/useAuthFetch';
import Alert from './Alert';

const NewCommentForm = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const authFetch = useAuthFetch();
  const { state, dispatch } = useAppContext();
  const [alert, displayAlert] = useAlert();
  const { showAlert, alertText, alertType } = alert;

  const updatePost = (comment) => {
    const posts = state.posts.map((post) => {
      // find post by postId
      if (post._id === postId) {
        post.comments.push(comment);
      }
      return post;
    });
    dispatch({
      type: 'UPDATE_POSTS',
      payload: {
        posts,
      },
    });
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await authFetch.post(`/post/${postId}/comment`, {
        content: newComment,
        userId: state.user._id,
      });
      displayAlert('Success', 'success');
      updatePost(data.comment);
    } catch (error) {
      console.log(error.response.data.msg);
      displayAlert(error.response.data.msg, 'danger');
    }
    setNewComment('');
  };

  return (
    <form action='' onSubmit={handleSubmit}>
      {showAlert && <Alert alertText={alertText} alertType={alertType} />}
      <input
        type='text'
        placeholder='Write something ...'
        value={newComment}
        onChange={handleChange}
      />
    </form>
  );
};

export default NewCommentForm;
