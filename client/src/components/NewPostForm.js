import { useState } from 'react';

import styled from 'styled-components';
import { useAppContext } from '../context/appContext';
import { useAlert, useAuthFetch } from '../hooks';
import Alert from './Alert';

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  background-color: #fff;
  padding: 1rem;
  align-self: center;
  border-radius: 0.5rem;
  width: 100%;

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    border: 1px solid var(--contrast);
  }

  div {
    width: 100%;
    form {
      width: 100%;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 1rem;
      button {
        width: fit-content;
      }

      input,
      button {
        margin: 0 !important;
      }
    }
  }
`;

const NewPostForm = () => {
  const [newPost, setNewPost] = useState('');
  const { state, dispatch } = useAppContext();
  const authFetch = useAuthFetch();
  const [loading, setLoading] = useState(false);
  const [alert, displayAlert] = useAlert();
  const { showAlert, alertText, alertType } = alert;
  const { profilePic } = state.user;

  const updatePost = (post) => {
    const posts = [post, ...state.posts];
    dispatch({
      type: 'UPDATE_POSTS',
      payload: {
        posts,
      },
    });
  };

  const handleChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPost) {
      displayAlert('Post content must not be empty', 'danger');
    } else {
      setLoading(true);
      try {
        const { data } = await authFetch.post('/post', {
          content: newPost,
        });
        displayAlert('Success', 'success');
        updatePost(data.post);
      } catch (error) {
        displayAlert(error.response.data.msg, 'danger');
        console.log(error);
      }
      setLoading(false);
      setNewPost('');
    }
  };

  return (
    <Wrapper>
      <img src={profilePic} alt='user profile' crossOrigin='anonymous' />
      <div>
        {showAlert && <Alert alertText={alertText} alertType={alertType} />}
        <form action='' onSubmit={handleSubmit}>
          <input
            name='post'
            value={newPost}
            onChange={handleChange}
            placeholder='How is your day?'
          />
          <button type='submit' aria-busy={loading} disabled={loading}>
            {loading ? '' : 'Post'}
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default NewPostForm;
