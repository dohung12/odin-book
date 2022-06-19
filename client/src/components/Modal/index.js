import React from 'react';

const index = ({ showModal, toggleModal, dataTarget, onConfirm, postInfo }) => {
  return (
    <dialog open={showModal}>
      <article
        style={{
          width: '100%',
        }}
      >
        <a
          href='#close'
          aria-label='Close'
          className='close'
          data-target={dataTarget}
          onClick={toggleModal}
        ></a>
        <h3>Delete Confirmation!</h3>
        <p>Do you want to delete this post?</p>
        <footer>
          <a
            href='#cancel'
            role='button'
            className='secondary'
            data-target={dataTarget}
            onClick={toggleModal}
          >
            Cancel
          </a>
          <a
            href='#confirm'
            role='button'
            data-target={dataTarget}
            onClick={onConfirm}
          >
            Confirm
          </a>
        </footer>
      </article>
    </dialog>
  );
};

export default index;
