const EditBtn = ({ values, setValues }) => {
  const handleEditBtn = () => {
    setValues({ ...values, isEditing: true });
  };
  return (
    <div
      role={'button'}
      className='outline contrast'
      onClick={handleEditBtn}
      disabled={values.isLoading}
    >
      Edit
    </div>
  );
};

export default EditBtn;
