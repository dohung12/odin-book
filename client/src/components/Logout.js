import React from 'react';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdLogout } from 'react-icons/md';
import { removeFromLocalStorage } from '../utils/localStorage';

const Wrapper = styled.a`
  display: flex;
  align-items: center;
  color: var(--contrast);
  padding: 1rem 0;
  padding-left: 2.5rem;
  text-transform: capitalize;
  transition: var(--transition);
  margin: 0;
  border-top: 1px solid #ccc;
  text-decoration: none;

  :hover {
    background: #f9d1e0;
    padding-left: 3rem;
    color: #d81b60;
    font-weight: bolder;
    .icon svg {
      color: #d81b60;
    }
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
`;

const Logout = ({ displayIcon }) => {
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

export default Logout;
