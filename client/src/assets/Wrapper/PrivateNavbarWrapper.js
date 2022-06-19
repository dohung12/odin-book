import styled from 'styled-components';

const Wrapper = styled.nav`
  box-shadow: 0 2px 0 rgba(115, 130, 140, 0.2);
  background-color: #fff;

  li {
    padding: 0;
    .active {
      font-weight: bolder;
      color: var(--primary);
    }
  }

  .logo {
    display: flex;
    align-items: center;
    h2 {
      margin: 0;
      display: none;
      @media (min-width: 992px) {
        display: block;
      }
    }
  }

  summary {
    display: flex;
    align-items: center;

    h5 {
      margin: 0 8px;
      display: none;
      @media (min-width: 992px) {
        display: block;
      }
    }
    :focus {
      background-color: #7da1b9;
      h5 {
        color: white;
      }
    }
  }
`;
export default Wrapper;
