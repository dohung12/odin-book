import Wrapper from './Wrapper';
import { FaTimes } from 'react-icons/fa';
import Logo from '../Logo';
import { useAppContext } from '../../context/appContext';
import { NavLink } from 'react-router-dom';
import links from '../../utils/links';

const SmallSidebar = () => {
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
          <button className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className='nav-links'>
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
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
