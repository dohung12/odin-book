import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
  border-top: 1px solid var(--secondary);
  border-bottom: 1px solid var(--secondary);
  margin-bottom: 1rem;

  div {
    margin: 0.25rem 0;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    border-color: transparent;
    padding: 5px 1.5rem;
    p {
      font-size: 16px;
      align-self: center;
      font-weight: bold;
      margin-bottom: 0;
      display: none;
      @media (min-width: 992px) {
        display: block;
      }
    }
  }

  div:hover {
    border-color: var(--secondary);
  }
`;
export default Wrapper;
