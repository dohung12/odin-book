import styled from 'styled-components';
import logo from '../assets/images/logo.svg';
import React from 'react';

const Wrapper = styled.a`
  img {
    display: block;
    width: 3.5rem;
    height: 3.5rem;
  }
  margin: 0;
`;

const Logo = () => {
  return (
    <Wrapper href='/'>
      <img src={logo} alt='logo' />
    </Wrapper>
  );
};

export default Logo;
