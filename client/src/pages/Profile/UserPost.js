import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { useAuthFetch } from '../../hooks';
import { Post } from '../../components';

const UserPost = () => {
  const authFetch = useAuthFetch();
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await authFetch.get(`/post/user?id=${state.user._id}`);
      dispatch({
        type: 'UPDATE_POSTS',
        payload: {
          posts: data.posts,
        },
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {loading && <h1 aria-busy={true}>Loading ...</h1>}
      {state.posts.map((post) => {
        return <Post key={post._id} {...post} />;
      })}
    </>
  );
};

export default UserPost;
