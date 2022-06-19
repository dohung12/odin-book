import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;

  hgroup {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
    h6 {
      color: var(--primary);
      text-transform: capitalize;
      margin: 0;
      font-size: 16px;
    }

    small {
      color: var(--secondary);
      font-size: 16px;
    }
  }

  button {
    width: auto;
    margin-bottom: 0;
    padding: 0.25rem;
    color: #fff;
  }
  .btn-container {
    display: flex;
    gap: 0.5rem;
    div {
      padding: 0.25rem;
      color: #fff;
    }
  }
`;

export default Wrapper;
