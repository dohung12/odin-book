import { useState, useEffect } from 'react';
import Post from '../../components/Post';
import { useAppContext } from '../../context/appContext';
import { useAuthFetch } from '../../hooks';

const DashboardPost = () => {
  const { state, dispatch } = useAppContext();
  const authFetch = useAuthFetch();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.get('/post/');
      const { posts } = data;

      dispatch({
        type: 'UPDATE_POSTS',
        payload: {
          posts,
        },
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {isLoading && <h1 aria-busy={isLoading}>Loading...</h1>}
      {state.posts.map((post) => {
        return <Post key={post._id} {...post} />;
      })}
    </>
  );
};

export default DashboardPost;
