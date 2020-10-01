import React from 'react';
import './App.css';
import ServerBar from './ServerBar';
import Server from './Server';
import Login from './Login';
import { useAuth0 } from '@auth0/auth0-react';
import { useStateValue } from './StateProvider';

function App() {
  const { isAuthenticated, isLoading, error, user } = useAuth0();

  console.log(error, user);
  return !isAuthenticated ? (
    <Login />
  ) : isLoading ? (
    <div>...loadin</div>
  ) : (
    <div className='app'>
      <ServerBar />
      <Server />
    </div>
  );
}

export default App;
