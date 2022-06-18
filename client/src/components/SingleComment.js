import { useState } from 'react';
import styled from 'styled-components';
import timeFormat from '../utils/timeFormat';
import Avatar from './Avatar';
import { useAppContext } from '../context/appContext';
import { useAuthFetch } from '../hooks';
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  hgroup {
    width: 100%;
    h6 {
      color: var(--primary);
      text-transform: capitalize;
      margin: 0;
    }
  }

  hgroup > p {
    background-color: #dfe8ee;
    padding: 8px;
    border-radius: 0.5rem;
  }

  hgroup,
  p {
    margin-bottom: 0;
  }
  .info {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    align-items: center;
    button {
      width: auto;
      padding: 0;
      margin: 0;
      border: 0;
      color: var(--muted-color);
      text-decoration: underline;
    }
  }
`;

const SingleComment = ({
  author,
  content,
  createdAt,
  postId,
  _id: commentId,
}) => {
  const { username, profilePic, _id: authorId } = author;
  const { state, dispatch } = useAppContext();
  const userId = state.user._id;
  const authFetch = useAuthFetch();

  const hasPermission = userId === authorId; //DISPLAY EDIT, DEL BUTTONS ONLY WHEN USER IS AUTHOR

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(content);

  /**
   * HANDLE DELETE BUTTON
   */

  const updateDelComment = () => {
    const posts = state.posts.map((post) => {
      // find post by postId
      if (post._id === postId) {
        post.comments = post.comments.filter(
          (comment) => comment._id !== commentId
        );
      }
      return post;
    });
    dispatch({
      type: 'UPDATE_POSTS',
      payload: {
        posts,
      },
    });
  };

  const handleDelBtn = async () => {
    setIsLoading(true);
    try {
      await authFetch.delete(`/post/${postId}/comment/${commentId}`);
      updateDelComment();
    } catch (error) {
      const { msg } = error.response.data;
      console.log(msg);
    }
    setIsLoading(false);
  };

  /**
   * HANDLE EDIT BUTTON
   */

  const updateEditComment = () => {
    const posts = state.posts.map((post) => {
      // find post by postId
      if (post._id === postId) {
        post.comments.map((item) => {
          if (item._id === commentId) {
            item.content = editedComment;
          }
          return item;
        });
      }
      return post;
    });
    dispatch({
      type: 'UPDATE_POSTS',
      payload: {
        posts,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await authFetch.patch(
        `/post/${postId}/comment/${commentId}`,
        { content: editedComment }
      );
      setEditedComment(data.comment.content);
      updateEditComment();
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setIsEditing(false);
    setIsLoading(false);
  };

  const handleEditBtn = () => {
    setIsEditing(true);
  };

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
            <p>{editedComment}</p>
            <div className='info'>
              {hasPermission && (
                <>
                  <div
                    role={'button'}
                    className='outline contrast'
                    onClick={handleEditBtn}
                    disabled={isLoading}
                  >
                    Edit
                  </div>
                  <div
                    role={'button'}
                    className='outline contrast'
                    onClick={handleDelBtn}
                    disabled={isLoading}
                  >
                    Delete
                  </div>
                </>
              )}
              <p>{timeFormat(createdAt)}</p>
            </div>
          </>
        )}
        {isEditing && (
          <form action='' onSubmit={handleSubmit}>
            <input
              type='text'
              value={editedComment}
              onChange={(e) => {
                setEditedComment(e.target.value);
              }}
            />
          </form>
        )}
      </hgroup>
    </Wrapper>
  );
};

export default SingleComment;
