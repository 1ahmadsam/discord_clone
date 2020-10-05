import React, { useState, useEffect } from 'react';
import './Chat.css';
import Message from './Message';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import GifIcon from '@material-ui/icons/Gif';
import RedeemIcon from '@material-ui/icons/Redeem';
import messageService from './services/messages';
import { useAuth0 } from '@auth0/auth0-react';
const Chat = () => {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const { user } = useAuth0();

  useEffect(() => {
    messageService.getAll().then((messages) => {
      setAllMessages(messages);
    });
  }, []);
  console.log('messages', allMessages);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      messageService
        .create({
          message: message,
          profilePic: user?.picture,
          username: user?.nickname,
        })
        .then((message) => {
          console.log('message was sent!!', message);
        })
        .catch((err) => err);
      setAllMessages([...allMessages, message]);
      setMessage('');
    } else {
      console.log('invalid user');
    }
  };

  return (
    <div className='chat'>
      <form className='chat__box' onSubmit={handleSubmit}>
        <div className='chat__inputBox'>
          <div className='chat__upload'>
            <AddCircleIcon />
          </div>
          <input
            type='text'
            placeholder='Message'
            className='chat__input'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className='chat__styleButtons'>
            <RedeemIcon />
            <GifIcon />
            <EmojiEmotionsIcon />
          </div>
        </div>
      </form>
      <div className='chat__space'></div>
      <div className='chat__messages'>
        {allMessages.map((message) => (
          <Message
            message={message.message}
            profile={message.profilePic}
            timestamp={message.date}
            username={message.username}
            key={message.id}
          />
        ))}
      </div>

      {/* <Message
        message={
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
        }
      />
      <Message
        message={
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
        }
      />
      <Message
        message={
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
        }
      />
      <Message
        message={
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
        }
      /> */}
    </div>
  );
};

export default Chat;
