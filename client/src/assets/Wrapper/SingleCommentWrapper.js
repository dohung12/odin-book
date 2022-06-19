import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  hgroup {
    width: 100%;
    h6 {
      color: var(--primary);
      text-transform: capitalize;
      margin: 0;
    }
  }

  hgroup > p {
    background-color: #dfe8ee;
    padding: 8px;
    border-radius: 0.5rem;
  }

  hgroup,
  p {
    margin-bottom: 0;
  }
  .info {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    align-items: center;
    div {
      width: auto;
      padding: 0;
      margin: 0;
      border: 0;
      color: var(--muted-color);
      text-decoration: underline;
    }
  }
`;

export default Wrapper;
