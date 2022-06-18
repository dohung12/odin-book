import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthFetch, useUpdatePosts } from '../hooks';
import { Post } from '../components/';
import styled from 'styled-components';
import { useAppContext } from '../context/appContext';
const Wrapper = styled.div`
  width: 60%;
  margin: auto;
  border-radius: 0.5rem;
`;

const SinglePostPage = () => {
  const { postId } = useParams();
  const authFetch = useAuthFetch();
  const updatePosts = useUpdatePosts();
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useAppContext();
  const post = state.posts[0];
  const fetchPost = async () => {
    try {
      const { data } = await authFetch.get(`/post/${postId}`);
      updatePosts([data.post]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [state.posts]);

  return (
    <Wrapper>
      {isLoading ? (
        <h1 aria-busy={true}>Loading</h1>
      ) : (
        <Post {...post} showComments={true} showAllComments={true} />
      )}
    </Wrapper>
  );
};

export default SinglePostPage;
