import { useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../../context/appContext';
import { useUpdatePosts } from '../../../hooks';
import EditForm from './EditForm';
import UserInfo from '../../UserInfo';
import UserInfoWrapper from '../../../assets/Wrapper/UserInfoBlockWrapper';
import PostContent from './PostContent';

const Wrapper = styled.div`
  .btn-container {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    align-items: center;
    div {
      width: auto;
      padding: 0;
      margin: 0;
      border: 0;
      color: var(--muted-color);
      text-decoration: underline;
    }
  }

  .loading {
    text-align: center;
    width: 100%;
  }

  .content,
  form,
  input {
    margin-bottom: 0;
  }
`;

const UserInfoWrapperExtended = styled(UserInfoWrapper)`
  hgroup {
    max-width: fit-content !important;
  }

  h6,
  small {
    font-size: 18px !important;
  }
`;

const TopPost = ({ author, createdAt, content, postId }) => {
  const { state } = useAppContext();
  const updatePosts = useUpdatePosts();

  const [values, setValues] = useState({
    isLoading: false,
    isEditing: false,
    postContent: content,
  });

  const { isLoading, isEditing, postContent } = values;
  const { username, profilePic, _id: authorId } = author;
  const userId = state.user._id;
  const hasPermission = userId === authorId;

  const postInfo = { profilePic, _id: authorId, createdAt, username };
  return (
    <Wrapper>
      <UserInfoWrapperExtended>
        <UserInfo {...postInfo} />
      </UserInfoWrapperExtended>
      {/* LOADING BLOCK */}
      {isLoading && (
        <div aria-busy={true} className='loading'>
          Loading...
        </div>
      )}
      {/* IF IN EDIT MODE, SHOW EDIT FORM. ELSE, DISPLAY POST CONTENT */}
      {isEditing ? (
        <EditForm
          postId={postId}
          setValues={setValues}
          values={values}
          updatePosts={updatePosts}
        />
      ) : (
        <PostContent
          hasPermission={hasPermission}
          values={values}
          setValues={setValues}
          postContent={postContent}
          postId={postId}
          postInfo={postInfo}
          updatePosts={updatePosts}
        />
      )}
    </Wrapper>
  );
};

export default TopPost;
