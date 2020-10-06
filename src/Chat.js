import React, { useState, useEffect } from 'react';
import './Chat.css';
import Message from './Message';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import GifIcon from '@material-ui/icons/Gif';
import RedeemIcon from '@material-ui/icons/Redeem';
import messageService from './services/messages';
import { useAuth0 } from '@auth0/auth0-react';
import {
  gql,
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from '@apollo/client';

const MESSAGE_DETAILS = gql`
  fragment MessageDetails on Message {
    message
    date
    id
    username
    profilePic
  }
`;

const ALL_MESSAGES = gql`
  query {
    allMessages {
      message
      date
      id
      username
      profilePic
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation createMessage(
    $message: String!
    $profilePic: String
    $username: String!
    $image: String
  ) {
    addMessage(
      message: $message
      profilePic: $profilePic
      username: $username
      image: $image
    ) {
      message
      date
      id
      username
      profilePic
    }
  }
`;
const MESSAGE_ADDED = gql`
  subscription {
    messageAdded {
      ...MessageDetails
    }
  }

  ${MESSAGE_DETAILS}
`;

const Chat = () => {
  const result = useQuery(ALL_MESSAGES);
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const { user } = useAuth0();
  const client = useApolloClient();
  const [createMessage, { data }] = useMutation(CREATE_MESSAGE);

  const updateCacheWith = (addedMessage) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_MESSAGES });
    if (!includedIn(dataInStore.allMessages, addedMessage)) {
      client.writeQuery({
        query: ALL_MESSAGES,
        data: { allMessages: dataInStore.allMessages.concat(addedMessage) },
      });
    }
  };

  useSubscription(MESSAGE_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('sub data', subscriptionData);
      const addedMessage = subscriptionData.data.messageAdded;
      updateCacheWith(addedMessage);
    },
  });

  console.log('updated?', data);
  useEffect(() => {
    // messageService.getAll().then((messages) => {
    //   setAllMessages(messages);
    // });

    console.log('yohoto', result);
    if (result.data) {
      setAllMessages(result.data?.allMessages);
    }
  }, [result]);

  console.log('messages', allMessages);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      createMessage({
        variables: {
          message: message,
          profilePic: user?.picture,
          username: user?.nickname,
        },
      });

      // console.log('kakaka', data);
      // // setAllMessages([...allMessages, data]);

      // .then((newMessage) => {
      //   console.log('message was sent!!', message);
      //   setAllMessages([...allMessages, newMessage]);
      // })
      // .catch((err) => console.log(err));

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
