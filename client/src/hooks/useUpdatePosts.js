import { useAppContext } from '../context/appContext';

const useUpdatePosts = () => {
  const { dispatch } = useAppContext();

  const updatePosts = (posts) => {
    dispatch({
      type: 'UPDATE_POSTS',
      payload: {
        posts,
      },
    });
  };
  return updatePosts;
};

export default useUpdatePosts;
