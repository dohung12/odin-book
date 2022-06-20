import styled from 'styled-components';

const Wrapper = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #fff;

  .posts-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    column-gap: 1rem;
    margin-bottom: 1rem;
  }

  .users-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    column-gap: 1rem;

    > div {
      padding: 1rem;
      border: 1px solid #ccc;
      cursor: pointer;

      :hover {
        background-color: #dfe8ee;
      }

      .link {
        display: block;
        text-align: end;
      }
    }
  }
`;

export default Wrapper;
