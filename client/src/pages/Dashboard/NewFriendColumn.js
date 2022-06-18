import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { useAuthFetch } from '../../hooks/';
import {
  FriendRequestToMe,
  FriendRequestToOthers,
  FriendRequestSuggestion,
} from '../../components/';

const NewFriendColumn = () => {
  const { state } = useAppContext();
  const authFetch = useAuthFetch();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState([]);

  const { requestToMe, requestToOthers } = state.user.friends;

  const fetchFriendSuggestion = async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.get('/user/friend/suggestNewFriend');
      setValues(data.users);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFriendSuggestion();
  }, [state.user.friends]);

  return (
    <>
      {isLoading ? (
        <h3 aria-busy={true}>Loading...</h3>
      ) : (
        <div>
          <FriendRequestToMe requestToMe={requestToMe} />
          <FriendRequestToOthers requestToOthers={requestToOthers} />
          <FriendRequestSuggestion requestSuggestion={values} />
        </div>
      )}
    </>
  );
};

export default NewFriendColumn;
