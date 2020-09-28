import React from 'react';
import Body from './Body';
import Sidebar from './Sidebar';
import './Server.css';
import Navbar from './Navbar';

const Server = () => {
  return (
    <div className='server'>
      <Sidebar />
      <Body />
    </div>
  );
};

export default Server;
