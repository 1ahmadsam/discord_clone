import React from 'react';
import './Login.css';

import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className='login'>
      <img
        className='login__logo'
        src='https://cdn.worldvectorlogo.com/logos/discord-logo-color-wordmark-1.svg'
        alt=''
      />
      <button className='login__button' onClick={() => loginWithRedirect()}>
        Login
      </button>
    </div>
  );
};

export default Login;
