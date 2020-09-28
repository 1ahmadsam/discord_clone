import React from 'react';
import './Body.css';
import Chat from './Chat';
import FriendsList from './FriendsList';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import InboxIcon from '@material-ui/icons/Inbox';
import HelpIcon from '@material-ui/icons/Help';
const Body = () => {
  return (
    <div className='body'>
      <div className='body__nav'>
        <div className='body__channelTitle'>#General</div>{' '}
        <div className='body__navMenu'>
          <NotificationsIcon />
          <PeopleAltIcon />
          <input type='text' placeholder='Search' className='body__search' />
          <InboxIcon />
          <HelpIcon />
        </div>
      </div>{' '}
      <div className='body__main'>
        <Chat />
        <FriendsList />
      </div>
    </div>
  );
};

export default Body;
