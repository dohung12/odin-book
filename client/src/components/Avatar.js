import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  img {
    width: 2.5rem !important;
    height: auto;
    border-radius: 50%;
    border: 1px solid var(--secondary);
    max-width: fit-content;
  }
`;

const Avatar = ({ src }) => {
  return (
    <Wrapper>
      <img src={src} alt='avatar' crossOrigin='anonymous' />
    </Wrapper>
  );
};

export default Avatar;
