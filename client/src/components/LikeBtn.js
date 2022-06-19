import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import { useAuthFetch } from '../hooks';
const LikeBtn = ({ postId, likes }) => {
  const { state, dispatch } = useAppContext();
  const userId = state.user._id;
  const liked = likes.some((element) => element._id === userId);

  // HOOKS
  const authFetch = useAuthFetch();
  const [values, setValues] = useState(liked);
  const [isLoading, setIsLoading] = useState(false);

  const updateLikePost = () => {
    const posts = state.posts.map((post) => {
      // find post by postId, toggle user like status
      if (post._id === postId) {
        const liked = post.likes.some((element) => element._id === userId);
        if (liked) {
          post.likes = post.likes.filter((user) => user._id !== userId);
        } else {
          post.likes.push(state.user);
        }
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

  const handleClick = async () => {
    setValues(!values);
    setIsLoading(true);
    try {
      await authFetch.post(`/post/${postId}/like`);
      updateLikePost();
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setIsLoading(false);
  };

  return (
    <div
      role={'button'}
      className='outline secondary'
      onClick={handleClick}
      disabled={isLoading}
    >
      {liked ? (
        <>
          <FaHeart color=' #43a047' />
          <p style={{ color: ' #43a047' }}>Liked</p>
        </>
      ) : (
        <>
          <FaHeart />
          <p>Like</p>
        </>
      )}
    </div>
  );
};

export default LikeBtn;
