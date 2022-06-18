import { useAppContext } from '../context/appContext';

const useUpdateUser = () => {
  const { dispatch } = useAppContext();

  const updateUser = (user) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: {
        user,
      },
    });
  };

  return updateUser;
};

export default useUpdateUser;
