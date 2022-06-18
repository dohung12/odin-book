import React from 'react';
import Logo from '../Logo';

import { Logout } from '..';
import { useAppContext } from '../../context/appContext';
import Wrapper from './Wrapper';
import { NavLink } from 'react-router-dom';
import links from '../../utils/links';
const Sidebar = () => {
  const { state, dispatch } = useAppContext();
  const { showSidebar } = state;

  const toggleSidebar = () => {
    dispatch({
      type: 'TOGGLE_SIDEBAR',
    });
  };

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <div className='nav-links'>
            <h3>Settings</h3>
            {links.map((link) => {
              const { text, path, id, icon } = link;

              return (
                <NavLink
                  to={path}
                  className={({ isActive }) => {
                    return isActive ? 'nav-link active' : 'nav-link';
                  }}
                  key={id}
                  onClick={toggleSidebar}
                >
                  <span className='icon'>{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
          <Logout displayIcon={true} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Sidebar;
