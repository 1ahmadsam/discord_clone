import React from 'react';
import './Chat.css';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import GifIcon from '@material-ui/icons/Gif';
import RedeemIcon from '@material-ui/icons/Redeem';
const Chat = () => {
  return (
    <div className='chat'>
      <form className='chat__box'>
        <div className='chat__input'>
          <input type='text' />
        </div>
      </form>
    </div>
  );
};

export default Chat;
