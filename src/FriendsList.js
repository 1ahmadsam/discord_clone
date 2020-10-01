import React from 'react';
import './FriendsList.css';

import { useAuth0 } from '@auth0/auth0-react';
const FriendsList = () => {
  const { user } = useAuth0();

  return (
    <div className='friendsList'>
      <div className='friendsList__header'>online-9</div>
      <div className='friendsList__person'>{user?.nickname}</div>
    </div>
  );
};

export default FriendsList;
