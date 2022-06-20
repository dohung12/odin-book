import { useState, useEffect } from 'react';
import { PageBtnContainer } from '../../../components';
import { useAppContext } from '../../../context/appContext';
import { useAuthFetch, useUpdatePosts } from '../../../hooks';
import SinglePost from './SinglePost';

const PostsContainer = () => {
  const authFetch = useAuthFetch();
  const { state } = useAppContext();
  const updatePosts = useUpdatePosts();

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [count, setCount] = useState(0);

  const fetchPosts = async () => {
    try {
      const { data } = await authFetch.get(
        `/search/posts${state.searchParams}&page=${page}`
      );
      updatePosts(data.posts);
      setNumOfPages(data.numOfPages);
      setCount(data.count);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page, numOfPages, state.searchParams]);

  return (
    <>
      {isLoading && <h1 aria-busy={'true'}>Loading ...</h1>}
      <details open={count > 0}>
        <summary aria-busy={isLoading} role={'button'}>
          Posts found: {count}
        </summary>
        {numOfPages > 1 && (
          <PageBtnContainer
            changePage={setPage}
            numOfPages={numOfPages}
            page={page}
          />
        )}
        <div className='posts-container'>
          {count > 0 &&
            state.posts.map((post) => {
              const { author, createdAt, content } = post;
              return (
                <SinglePost
                  author={author}
                  createdAt={createdAt}
                  content={content}
                  postId={post._id}
                  key={post._id}
                />
              );
            })}
        </div>
        {numOfPages > 1 && (
          <PageBtnContainer
            changePage={setPage}
            numOfPages={numOfPages}
            page={page}
          />
        )}
      </details>
    </>
  );
};

export default PostsContainer;
