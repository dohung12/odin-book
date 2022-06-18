import Avatar from '../../../components/Avatar';
import timeFormat from '../../../utils/timeFormat';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  h6 {
    color: var(--primary);
    text-transform: capitalize;
    margin: 0;
  }
  small {
    color: #9ca3af;
  }
`;

const AuthorInfo = ({ profilePic, authorId, username, createdAt }) => {
  return (
    <Wrapper>
      <Avatar src={profilePic} />
      <hgroup>
        <a href={`/user/${authorId}`}>
          <h6>{username}</h6>
        </a>
        <small>{timeFormat(createdAt)}</small>
      </hgroup>
    </Wrapper>
  );
};

export default AuthorInfo;
