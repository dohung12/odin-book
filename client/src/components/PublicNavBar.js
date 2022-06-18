import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const Wrapper = styled.nav`
  box-shadow: 0 1px 0 var(--nav-border-color);
`;

const PublicNavBar = () => {
  return (
    <Wrapper className='container-fluid'>
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
    </Wrapper>
  );
};

export default PublicNavBar;
