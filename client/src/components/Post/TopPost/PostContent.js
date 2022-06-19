import React from 'react';
import Wrapper from '../../../assets/Wrapper/PostBtnsContainer';
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
        <Wrapper>
          <EditBtn values={values} setValues={setValues} />
          <DelBtn
            values={values}
            setValues={setValues}
            postId={postId}
            updatePosts={updatePosts}
          />
        </Wrapper>
      )}
    </>
  );
};

export default PostContent;
