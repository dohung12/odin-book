import img from '../assets/images/main.svg';
import styled from 'styled-components';
import CreateTestAccBtn from '../components/CreateTestAccBtn';
import { useNavigate } from 'react-router-dom';
const Wrapper = styled.main`
  padding-top: 90px;

  img {
    display: none;
    @media (min-width: 992px) {
      display: block;
    }
  }
`;

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Wrapper className='container'>
      <div className='grid'>
        <img src={img} alt='main' />
        <div>
          <hgroup className='info'>
            <h1>Friend Making App</h1>
            <h6>
              Welcome to The Odin Book, the place where you can share your story
              with all of your friends.
            </h6>
          </hgroup>
          <div className='btn-container'>
            <CreateTestAccBtn />
            <button
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate('/register');
              }}
              className='contrast'
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
