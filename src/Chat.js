import React, { useState } from 'react';
import './Chat.css';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import GifIcon from '@material-ui/icons/Gif';
import RedeemIcon from '@material-ui/icons/Redeem';
const Chat = () => {
  const [message, setMessage] = useState('');
  return (
    <div className='chat'>
      <form className='chat__box' onSubmit={() => console.log(message)}>
        <div className='chat__inputBox'>
          <div className='chat__upload'>
            <AddCircleIcon />
          </div>
          <input
            type='text'
            placeholder='Message'
            className='chat__input'
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className='chat__styleButtons'>
            <RedeemIcon />
            <GifIcon />
            <EmojiEmotionsIcon />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chat;
