import React from 'react';
import './Sidebar.css';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { useAuth0 } from '@auth0/auth0-react';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
const Sidebar = () => {
  const { user } = useAuth0();

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>Server:Name </div>{' '}
      <div className='sidebar__channels'>
        <h3>Channels</h3>
      </div>
      <div className='sidebar__userInfo'>
        <div className='sidebar__imageContainer'>
          <img src={user?.picture} alt='' className='sidebar__userImage' />
          <Brightness1Icon className='sidebar__userStatus' />
        </div>
        <div className='sidebar__userName'>{user?.nickname}</div>
      </div>
      <div className='sidebar__iconList'>
        {/* <MicIcon />
        <HeadsetIcon />
        <SettingsIcon /> */}
      </div>
    </div>
  );
};

export default Sidebar;
