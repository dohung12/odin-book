import React from 'react';
import DelBtn from './DelBtn';
import EditBtn from './EditBtn';

const PostContent = ({
  postContent,
  values,
  setValues,
  hasPermission,
  postId,
  updatePosts,
}) => {
  return (
    <>
      <p className='content'>{postContent}</p>
      {/* IF CURRENT USER IS THE AUTHOR OF POST, DISPLAY EDIT, DEL BUTTONS */}
      {hasPermission && (
        <div className='btn-container'>
          <EditBtn values={values} setValues={setValues} />
          <DelBtn
            values={values}
            setValues={setValues}
            postId={postId}
            updatePosts={updatePosts}
          />
        </div>
      )}
    </>
  );
};

export default PostContent;
