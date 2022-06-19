import { useAppContext } from '../context/appContext';
import { FaAlignLeft } from 'react-icons/fa';
import LogoutBtn from './LogoutBtn';
import Logo from './Logo';
import Avatar from './Avatar';
import { NavLink } from 'react-router-dom';
import SearchForm from './SearchForm';
import Wrapper from '../assets/Wrapper/PrivateNavbarWrapper';

const PrivNavBar = () => {
  const { state, dispatch } = useAppContext();
  const { username } = state.user;

  const toggleSidebar = () => {
    dispatch({
      type: 'TOGGLE_SIDEBAR',
    });
  };

  return (
    <Wrapper className='container-fluid'>
      <ul>
        <li>
          <div
            role={'button'}
            className='outline contrast'
            onClick={toggleSidebar}
          >
            <FaAlignLeft />
          </div>
        </li>
        <li className='logo'>
          <Logo />
          <a href='/'>
            <h2>Odin Book</h2>
          </a>
        </li>
      </ul>
      <SearchForm />
      <ul>
        <li>
          <details role={'list'} dir='rtl'>
            <summary aria-haspopup='listbox' role={'link'}>
              <Avatar src={state.user.profilePic} />
              <h5>{username}</h5>
            </summary>
            <ul role={'listbox'}>
              <li>
                <NavLink to='/'>Homepage</NavLink>
              </li>
              <li>
                <NavLink to='/settings'>Setting</NavLink>
              </li>
              <li>
                <NavLink to='/profile'>Profile</NavLink>
              </li>
              <li>
                <LogoutBtn />
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </Wrapper>
  );
};

export default PrivNavBar;
