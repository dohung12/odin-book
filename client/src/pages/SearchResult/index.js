import { useAppContext } from '../../context/appContext';
import PostsContainer from './PostsContainer';
import UsersContainer from './UsersContainer';
import Wrapper from './Wrapper';

const SearchResult = () => {
  const { state } = useAppContext();
  return (
    <Wrapper>
      <h1>
        Search results for:
        <span> {state.searchParams.split('=')[1]}</span>
      </h1>
      <PostsContainer />
      <UsersContainer />
    </Wrapper>
  );
};

export default SearchResult;
