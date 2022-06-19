import { useState } from 'react';
import timeFormat from '../../utils/timeFormat';
import Avatar from '../Avatar';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/Wrapper/SingleCommentWrapper';
import DelBtn from './DelBtn';
import EditBtn from './EditBtn';
import EditCommentForm from './EditCommentForm';

const SingleComment = ({
  author,
  content,
  createdAt,
  postId,
  _id: commentId,
}) => {
  const { username, profilePic, _id: authorId } = author;
  const { state } = useAppContext();
  const userId = state.user._id;

  //DISPLAY EDIT, DEL BUTTONS ONLY WHEN USER IS AUTHOR
  const hasPermission = userId === authorId;

  const [values, setValues] = useState({
    isLoading: false,
    isEditing: false,
    commentContent: content,
  });
  const { isLoading, isEditing, commentContent } = values;

  /**
   * HANDLE EDIT BUTTON
   */

  return (
    <Wrapper>
      <Avatar src={profilePic} />
      <hgroup>
        <a href={`/user/${authorId}`}>
          <h6>{username}</h6>
        </a>
        {!isEditing && (
          <>
            {isLoading && <div aria-busy={true}>Loading...</div>}
            <p>{commentContent}</p>
            <div className='info'>
              {hasPermission && (
                <>
                  <EditBtn values={values} setValues={setValues} />
                  <DelBtn
                    postId={postId}
                    commentId={commentId}
                    setValues={setValues}
                    values={values}
                    state={state}
                  />
                </>
              )}
              <p>{timeFormat(createdAt)}</p>
            </div>
          </>
        )}
        {isEditing && (
          <EditCommentForm
            values={values}
            setValues={setValues}
            state={state}
            commentId={commentId}
            postId={postId}
          />
        )}
      </hgroup>
    </Wrapper>
  );
};

export default SingleComment;
