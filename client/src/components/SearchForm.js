import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../assets/Wrapper/SearchFormWrapper';
import { useAppContext } from '../context/appContext';

const SearchForm = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useAppContext();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_SEARCH',
      payload: {
        searchParams: `?search=${value}`,
      },
    });
    navigate('/result');
  };
  return (
    <Wrapper>
      <form action='/result' method='get' onSubmit={handleSubmit}>
        <input
          type='search'
          name='search'
          id='search'
          value={value}
          onChange={handleChange}
        />
      </form>
    </Wrapper>
  );
};

export default SearchForm;
