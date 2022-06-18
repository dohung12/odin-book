import React, { useState, useEffect } from 'react';
import img from '../assets/images/auth.svg';
import { FormRow, Alert } from '../components/index';
import axios from 'axios';
import styled from 'styled-components';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import useAlert from '../hooks/useAlert';
import { addToLocalStorage } from '../utils/localStorage';

const Wrapper = styled.main`
  margin-top: 2rem;

  .img-block {
    img {
      height: 50%;
      margin: auto;
      display: none;
      @media (min-width: 992px) {
        display: block;
      }
    }
  }

  hgroup {
    text-align: center;
    margin: auto;
  }
`;

// hooks' init states
const initUserState = {
  username: '',
  email: '',
  password: '',
  confirmedPassword: '',
};

const Register = () => {
  const [values, setValues] = useState(initUserState);
  const [alert, displayAlert] = useAlert();

  let navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { user } = state;

  const { username, email, password, confirmedPassword } = values;
  const { showAlert, alertText, alertType } = alert;

  /**
   * HANDLE FORM INPUT CHANGES
   */
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  /**
   * HANDLE FORM SUBMIT
   */

  const registerUser = async (currentUser) => {
    try {
      const { data } = await axios.post('/register', currentUser);
      const { user, token } = data;
      // save data to global context
      dispatch({
        type: 'SETUP_USER',
        payload: {
          user,
          token,
        },
      });
      // save data to local storage
      addToLocalStorage(user, token);
      // display alert
      displayAlert('Register success!', 'success');
    } catch (error) {
      displayAlert(error.response.data.msg, 'danger');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmedPassword } = values;

    // check if missing input fields
    if (!username || !email || !password || !confirmedPassword) {
      displayAlert('Please provide all information', 'danger');
    }

    // check if password and confirmedPassword is different
    else if (password !== confirmedPassword) {
      displayAlert('Incorrect confirm password', 'danger');
    }

    // post data to server
    else {
      registerUser({ username, email, password });
    }
  };

  /**
   * REDIRECT AFTER REGISTER SUCCESS
   */

  useEffect(() => {
    if (user) {
      setTimeout(() => navigate('/'), 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className='container'>
      <article className='grid'>
        <div className='img-block'>
          {!user ? (
            <h1>Register</h1>
          ) : (
            <hgroup>
              <h1> You are already login</h1>
              <p aria-busy='true'>Navigate to home page ...</p>
            </hgroup>
          )}
          <img src={img} alt='register' />
        </div>

        {!user && (
          <div>
            {showAlert && <Alert alertText={alertText} alertType={alertType} />}
            <form action=''>
              <div className='grid'>
                <FormRow
                  inputType='text'
                  name={'username'}
                  value={username}
                  placeholder='Username'
                  handleChange={handleChange}
                />
                <FormRow
                  inputType='email'
                  name={'email'}
                  value={email}
                  placeholder='Email'
                  handleChange={handleChange}
                />
              </div>

              <FormRow
                inputType='password'
                name={'password'}
                value={password}
                placeholder='Password'
                handleChange={handleChange}
              />
              <FormRow
                inputType='password'
                name={'confirmedPassword'}
                value={confirmedPassword}
                placeholder='Confirm Password'
                handleChange={handleChange}
              />
              <p>
                Already a member?
                <a href='/login'> Login</a>
              </p>
              <button type='submit' onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        )}
      </article>
    </Wrapper>
  );
};

export default Register;
