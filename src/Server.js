import React from 'react';
import Body from './Body';
import Sidebar from './Sidebar';
import './Server.css';

const Server = () => {
  return (
    <div className='server'>
      <Sidebar />
      <Body />
    </div>
  );
};

export default Server;
