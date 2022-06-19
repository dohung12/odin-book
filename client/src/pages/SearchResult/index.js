import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/appContext';
import { useAuthFetch } from '../../hooks';
import SingleUser from './SingleUserBlock/';
import SinglePost from './SinglePostBlock';

const Wrapper = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #fff;

  .posts-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    column-gap: 1rem;
    margin-bottom: 1rem;
  }

  .users-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    column-gap: 1rem;

    > div {
      padding: 1rem;
      border: 1px solid #ccc;
      cursor: pointer;

      :hover {
        background-color: #dfe8ee;
      }

      .link {
        display: block;
        text-align: end;
      }
    }
  }
`;

const initState = {
  users: [],
  posts: [],
};

const SearchResult = () => {
  const authFetch = useAuthFetch();
  const { state } = useAppContext();
  const [values, setValues] = useState(initState);
  const { users, posts } = values;

  const fetchData = async () => {
    try {
      const { data } = await authFetch.get(`/search${state.searchParams}`);
      const { users, posts } = data;
      setValues({
        ...values,
        users,
        posts,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [state.searchParams]);

  return (
    <Wrapper>
      <h1>
        Search results for:
        <span> {state.searchParams.split('=')[1]}</span>
      </h1>
      <hgroup>
        <h3>Posts</h3>
        <h6>Posts found: {values.posts.length}</h6>
      </hgroup>
      <div className='posts-container'>
        {posts.map((post) => {
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
      <hgroup>
        <h3>Users</h3>
        <h6>Users found: {values.users.length}</h6>
      </hgroup>
      <div className='users-container'>
        {users.map((user) => {
          return <SingleUser {...user} key={user._id} />;
        })}
      </div>
    </Wrapper>
  );
};

export default SearchResult;
