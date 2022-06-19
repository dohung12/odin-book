import styled from 'styled-components';

const Wrapper = styled.a`
  display: flex;
  align-items: center;
  color: var(--contrast);
  padding: 1rem 0;
  padding-left: 2.5rem;
  text-transform: capitalize;
  transition: var(--transition);
  margin: 0;
  border-top: 1px solid #ccc;
  text-decoration: none;

  :hover {
    background: #f9d1e0;
    padding-left: 3rem;
    color: #d81b60;
    font-weight: bolder;
    .icon svg {
      color: #d81b60;
    }
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
`;
export default Wrapper;
