import Logo from './Logo';

const PublicNavBar = () => {
  return (
    <nav
      className='container-fluid'
      style={{
        boxShadow: 'rgb(0 0 0 / 10%) 0px 1px 0px 0px',
      }}
    >
      <ul>
        <li
          style={{
            padding: 0,
          }}
        >
          <Logo />
        </li>
        <li>
          <h2
            style={{
              margin: 0,
            }}
          >
            Odin Book
          </h2>
        </li>
      </ul>
      <ul>
        <li>
          <a href='/login' role={'button'}>
            Login
          </a>
        </li>
        <li>
          <a href='/register' role={'button'} className='contrast'>
            Register
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PublicNavBar;
