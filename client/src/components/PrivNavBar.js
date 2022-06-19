import styled from 'styled-components';
import { useAppContext } from '../context/appContext';
import { FaAlignLeft } from 'react-icons/fa';
import LogoutBtn from './LogoutBtn';
import Logo from './Logo';
import Avatar from './Avatar';
import { NavLink } from 'react-router-dom';
import SearchForm from './SearchForm';

const Wrapper = styled.nav`
  box-shadow: 0 2px 0 rgba(115, 130, 140, 0.2);
  .logo {
    padding: 0;
  }

  background-color: #fff;

  h5 {
    margin: 0 8px;
    display: none;
    @media (min-width: 992px) {
      display: block;
    }
  }
  li {
    padding: 0;
    .active {
      font-weight: bolder;
      color: var(--primary);
    }
  }

  summary {
    display: flex;
    align-items: center;

    :focus {
      h5 {
        color: white;
      }
    }
  }
`;

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
        <li>
          <Logo />
        </li>
        <li>
          <a href='/'>
            <h2
              style={{
                margin: 0,
              }}
            >
              Odin Book
            </h2>
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
