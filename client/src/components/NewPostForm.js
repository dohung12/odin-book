import { useState } from 'react';
import Wrapper from '../assets/Wrapper/PostFromWrapper';
import { useAppContext } from '../context/appContext';
import { useAlert, useAuthFetch, useUpdatePosts } from '../hooks';
import Alert from './Alert';

const NewPostForm = () => {
  // HOOKS
  const authFetch = useAuthFetch();
  const updatePosts = useUpdatePosts();

  const { state } = useAppContext();
  const { profilePic } = state.user;

  const [alert, displayAlert] = useAlert();
  const { showAlert, alertText, alertType } = alert;

  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);

  const updatePost = (post) => {
    const posts = [post, ...state.posts];
    updatePosts(posts);
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
