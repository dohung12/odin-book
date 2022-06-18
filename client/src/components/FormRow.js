import React from 'react';

const FormRow = ({ name, inputType, value, placeholder, handleChange }) => {
  return (
    <>
      <input
        type={inputType}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </>
  );
};

export default FormRow;
