import { useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../context/appContext';
import { Alert } from '../components/';
import useAlert from '../hooks/useAlert';
import axios from 'axios';
import useAuthFetch from '../hooks/useAuthFetch';
import { addToLocalStorage } from '../utils/localStorage';

const Wrapper = styled.section`
  padding: 3rem;
  width: 600px;
  margin: auto;
  background-color: #fff;
  border-radius: 0.5rem;

  .img-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1rem;
    gap: 1rem;
    img {
      width: 50%;
      border-radius: 0.5rem;
      border: 1px solid #ccc;
    }
  }
`;

const Profile = () => {
  const { state, dispatch } = useAppContext();
  const [values, setValues] = useState(state.user);
  const [alert, displayAlert] = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const authFetch = useAuthFetch();

  const { email, profilePic, username, bio } = values;
  const { showAlert, alertType, alertText } = alert;

  /**
   * HANDLE INPUT CHANGES
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleInputFileChange = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', imageFile);
    setIsLoading(true);
    try {
      const { data } = await axios.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setValues({ ...values, profilePic: data.img.src });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  /**
   * HANDLE FORM SUBMIT
   */

  const updateProfile = async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.patch(`/user/profile`, values);
      const { token, user } = data;
      addToLocalStorage(user, token);
      dispatch({
        type: 'SETUP_USER',
        payload: {
          token,
          user,
        },
      });
      displayAlert('Update success!', 'success');
    } catch (error) {
      console.log(error);
      if (error.response.status !== 401) {
        displayAlert(error.response.data.msg, 'danger');
      }
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !profilePic || !username) {
      displayAlert('Please provide all values', 'danger');
    } else {
      updateProfile(values);
    }
  };
  return (
    <Wrapper>
      <hgroup>
        <h3>Setting Profile</h3>
        <p>Update your profile pic and personal information.</p>
      </hgroup>

      <form action='' onSubmit={handleSubmit}>
        <h5>Change your profile picture</h5>
        <div className='img-input'>
          <img src={profilePic} alt='avatar' crossOrigin='anonymous' />
          {isLoading && <p aria-busy={isLoading}>Loading ...</p>}
          <input
            type='file'
            name='profilePic'
            onChange={handleInputFileChange}
          />
        </div>

        <h5>Change your personal information</h5>

        <label htmlFor='email'>Email</label>
        <input
          type={'email'}
          name='email'
          placeholder={'Email'}
          value={email}
          readOnly
        />

        <label htmlFor='username'>Username</label>
        <input
          type={'text'}
          name='username'
          placeholder={'Username'}
          onChange={handleChange}
          value={username}
        />

        <label htmlFor='bio'>Short personal description</label>
        <textarea
          name='bio'
          cols='30'
          rows='5'
          placeholder='Write a short introduction'
          value={bio}
          onChange={handleChange}
        />

        {showAlert && <Alert alertText={alertText} alertType={alertType} />}

        <button type='submit' disabled={isLoading} aria-busy={isLoading}>
          Save changes
        </button>
      </form>
    </Wrapper>
  );
};

export default Profile;
