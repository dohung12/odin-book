import { useAppContext } from '../context/appContext';
import useAuthFetch from './useAuthFetch';

const useUserProfile = () => {
  const { state, dispatch } = useAppContext();
  const authFetch = useAuthFetch();

  const fetchUser = async () => {
    try {
      const { data } = await authFetch.get(`/user/${state.user._id}`);
      dispatch({
        type: 'SETUP_USER',
        payload: {
          user: data.user,
          token: state.token,
        },
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return fetchUser;
};

export default useUserProfile;
