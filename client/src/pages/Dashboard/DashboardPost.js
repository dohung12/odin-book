import { useState, useEffect } from 'react';
import { Post, PageBtnContainer } from '../../components/';
import { useAppContext } from '../../context/appContext';
import { useAuthFetch, useUpdatePosts } from '../../hooks';

const DashboardPost = () => {
  const { state } = useAppContext();
  const authFetch = useAuthFetch();
  const updatePosts = useUpdatePosts();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.get(`/post/?page=${page}`);

      updatePosts(data.posts);
      setNumOfPages(data.numOfPages);
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page, numOfPages]);

  return (
    <>
      {isLoading && <h1 aria-busy={isLoading}>Loading...</h1>}
      {numOfPages > 1 && (
        <PageBtnContainer
          numOfPages={numOfPages}
          page={page}
          changePage={setPage}
        />
      )}
      {state.posts.map((post) => {
        return <Post key={post._id} {...post} />;
      })}
      {numOfPages > 1 && (
        <PageBtnContainer
          numOfPages={numOfPages}
          page={page}
          changePage={setPage}
        />
      )}
    </>
  );
};

export default DashboardPost;
