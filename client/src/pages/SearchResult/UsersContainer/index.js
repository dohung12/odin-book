import { useState, useEffect } from 'react';
import { PageBtnContainer } from '../../../components';
import { useAppContext } from '../../../context/appContext';
import { useAuthFetch } from '../../../hooks';
import SingleUser from './SingleUser';

const PostsContainer = () => {
  const authFetch = useAuthFetch();
  const { state } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await authFetch.get(
        `/search/users${state.searchParams}&page=${page}`
      );
      setUsers(data.users);
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
        <summary aria-busy={isLoading} role={'button'} className='contrast'>
          Users found: {count}
        </summary>
        {numOfPages > 1 && (
          <PageBtnContainer
            changePage={setPage}
            numOfPages={numOfPages}
            page={page}
          />
        )}
        <div className='users-container'>
          {count > 0 &&
            users.map((user) => {
              return <SingleUser {...user} key={user._id} />;
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
