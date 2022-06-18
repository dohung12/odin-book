import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  img {
    width: 100%;
    height: auto;
  }

  hgroup {
    margin-bottom: 0;
    p {
      padding-top: 0.25rem;
      margin-bottom: 0;
    }
  }
`;

const UserInfoBlock = ({ username, profilePic, email, bio }) => {
  return (
    <Wrapper>
      <img src={profilePic} alt='avatar' crossOrigin='anonymous' />
      <hgroup>
        <h3>{username}</h3>
        <h5>{email}</h5>
        <p>{bio.length > 75 ? bio.slice(0, 75) + '...' : bio}</p>
      </hgroup>
    </Wrapper>
  );
};

export default UserInfoBlock;
