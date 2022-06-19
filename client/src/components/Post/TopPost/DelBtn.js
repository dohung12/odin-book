import { useAppContext } from '../../../context/appContext';
import { useAuthFetch } from '../../../hooks';
import { useState } from 'react';
import Modal from '../../Modal';
const DelBtn = ({ postId, values, setValues, updatePosts }) => {
  const authFetch = useAuthFetch();
  const { state } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDelBtn = async () => {
    setValues({
      ...values,
      isLoading: true,
    });
    try {
      await authFetch.delete(`/post/${postId}`);
      const posts = state.posts.filter((post) => post._id !== postId);
      updatePosts(posts);
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setValues({
      ...values,
      isLoading: false,
    });
  };
  return (
    <>
      <div
        role={'button'}
        className='outline contrast'
        // onClick={handleDelBtn}
        onClick={toggleModal}
        data-target={postId}
      >
        Delete
      </div>
      <Modal
        showModal={showModal}
        toggleModal={toggleModal}
        dataTarget={postId}
        onConfirm={handleDelBtn}
      />
    </>
  );
};

export default DelBtn;
