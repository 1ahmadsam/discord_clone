import React from 'react';
import './Message.css';
const Message = ({ message, profile, username, timestamp }) => {
  return (
    <div className='message'>
      <img src={profile} alt='' className='message__profile' />
      <div className='message__contents'>
        <div className='message__header'>
          <div className='message__user'>{username}</div>
          <div className='message__postDate'>
            {/* {new Date(timestamp?.toDate()).toUTCString()}  convert*/}
          </div>
        </div>
        <div className='message__text'>{message}</div>
      </div>
    </div>
  );
};

export default Message;
