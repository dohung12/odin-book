import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import img from '../assets/images/login.svg';
import { FormRow, Alert } from '../components/index';
import { useAppContext } from '../context/appContext';
import useAlert from '../hooks/useAlert';
import { addToLocalStorage } from '../utils/localStorage';

const initUserState = {
  email: '',
  password: '',
};

const Wrapper = styled.main`
  margin-top: 2rem;

  .img-block {
    display: none;
    @media (min-width: 992px) {
      display: block;
    }
  }

  hgroup {
    text-align: center;
    margin: auto;
  }
`;

const Register = () => {
  const [values, setValues] = useState(initUserState);
  const [isLoading, setIsLoading] = useState(false);

  const [alert, displayAlert] = useAlert();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { user } = state;
  const { email, password } = values;
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

  const loginUser = async (currentUser) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/login', currentUser);
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
      displayAlert('Login success!', 'success');
    } catch (error) {
      displayAlert(error.response.data.msg, 'danger');
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;

    // check if missing input fields
    if (!email || !password) {
      displayAlert('Please provide all information', 'danger');
    } else {
      loginUser({ email, password });
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
        {user && (
          <hgroup>
            <h1>You are already login</h1>
            <p aria-busy='true'>Navigate to home page ...</p>
          </hgroup>
        )}
        {!user && (
          <form action=''>
            <h1>Login</h1>

            {showAlert && <Alert alertText={alertText} alertType={alertType} />}
            <FormRow
              inputType='email'
              name={'email'}
              value={email}
              placeholder='Email'
              handleChange={handleChange}
            />

            <FormRow
              inputType='password'
              name={'password'}
              value={password}
              placeholder='Password'
              handleChange={handleChange}
            />

            <p
              style={{
                textAlign: 'end',
              }}
            >
              Not a member?
              <a href='/register'> Register</a>
            </p>
            <button
              type='submit'
              className='contrast'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting ...' : 'Submit'}
            </button>
          </form>
        )}
        <div className='img-block'>
          <img src={img} alt='register' />
        </div>
      </article>
    </Wrapper>
  );
};

export default Register;
