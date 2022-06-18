import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { addToLocalStorage } from '../utils/localStorage';

const CreateTestAccBtn = () => {
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // SET UP TEST ACC
  const setUpTestAcc = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get('/api/v1/createTestAcc');
      const { user, token } = data;
      dispatch({
        type: 'SETUP_USER',
        payload: {
          user,
          token,
        },
      });
      addToLocalStorage(user, token);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setUpTestAcc();
  };

  // NAVIGATE TO DASHBOARD WHEN ACCOUNT IS READY
  useEffect(() => {
    if (state.user) {
      navigate('/');
    }
  }, [navigate, state.user]);

  return (
    <button
      aria-busy={isLoading}
      disabled={isLoading}
      onClick={handleClick}
      style={{
        backgroundColor: '#43a047',
        borderColor: '#43a047',
      }}
    >
      {isLoading ? 'Loading ...' : 'Create Test Account'}
    </button>
  );
};

export default CreateTestAccBtn;
