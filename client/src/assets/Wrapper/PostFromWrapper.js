import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  background-color: #fff;
  padding: 1rem;
  align-self: center;
  border-radius: 0.5rem;
  width: 100%;

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    border: 1px solid var(--contrast);
  }

  div {
    width: 100%;
    form {
      width: 100%;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 1rem;
      button {
        width: fit-content;
      }

      input,
      button {
        margin: 0 !important;
      }
    }
  }
`;

export default Wrapper;
