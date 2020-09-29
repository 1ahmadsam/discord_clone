import React from 'react';
import './Message.css';
const Message = (props) => {
  return (
    <div className='message'>
      <div className='message__text'>{props.message}</div>
    </div>
  );
};

export default Message;
