import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { useAuthFetch } from '../../hooks';
import { Post } from '../../components';
import styled from 'styled-components';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserPost = ({ userId }) => {
  const authFetch = useAuthFetch();
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await authFetch.get(`/post/user?id=${userId}`);
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
    <Wrapper>
      {loading && <h1 aria-busy={true}>Loading ...</h1>}
      {state.posts.map((post) => {
        return <Post key={post._id} {...post} />;
      })}
      {state.posts.length === 0 && (
        <h1
          style={{
            width: '100%',
            borderRadius: '0.5rem',
            padding: '1rem',
            backgroundColor: '#fff',
          }}
        >
          This user hasn't post anything yet
        </h1>
      )}
    </Wrapper>
  );
};

export default UserPost;
