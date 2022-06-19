import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;

  div {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    p {
      margin-bottom: 0;
      font-size: 16px;
    }
  }
`;
export default Wrapper;
