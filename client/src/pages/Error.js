import React from 'react';
import img from '../assets/images/404.svg';
import styled from 'styled-components';

const Wrapper = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }

  h3 {
    margin-bottom: 0;
  }
`;

const Error = () => {
  return (
    <Wrapper className='container'>
      <div>
        <img src={img} alt='error' />
        <div className='grid'>
          <div>
            <h3>Page not found</h3>
            <p>We can't find the page you are looking for.</p>
          </div>

          <a href='/' role={'button'} className='outline'>
            Back home
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

export default Error;
