import React from 'react';

const EditBtn = ({ values, setValues }) => {
  const handleEditBtn = () => {
    setValues({ ...values, isEditing: true });
  };
  return (
    <div role={'button'} className='outline contrast' onClick={handleEditBtn}>
      Edit
    </div>
  );
};

export default EditBtn;
