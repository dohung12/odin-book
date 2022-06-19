import React from 'react';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { removeFromLocalStorage } from '../utils/localStorage';

import Wrapper from '../assets/Wrapper/LogOutBtnWrapper';

const LogoutBtn = ({ displayIcon }) => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch({
      type: 'LOGOUT_USER',
    });

    removeFromLocalStorage();
    navigate('/landing');
  };

  return (
    <Wrapper onClick={logoutUser} className='outline contrast'>
      {displayIcon && (
        <span className='icon'>
          <MdLogout />
        </span>
      )}
      Log out
    </Wrapper>
  );
};

export default LogoutBtn;
