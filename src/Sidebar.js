import React from 'react';
import './Sidebar.css';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { useAuth0 } from '@auth0/auth0-react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
const Sidebar = () => {
  const { user } = useAuth0();

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <h3>Discord-Clone</h3> <ExpandMoreIcon />{' '}
      </div>{' '}
      <div className='sidebar__channels'>
        <div className='sidebar__textChannel'>
          <div className='sidebar__textChannel__header'>
            <div>
              <ExpandMoreIcon />
              <h5>TEXT CHANNELS</h5>
            </div>{' '}
            <AddIcon />
          </div>
          <div className='sidebar__textChannel__channel'>
            {' '}
            <span>#</span> general
          </div>
        </div>
        <div className='sidebar__textChannel'>
          <div className='sidebar__textChannel__header'>
            <div>
              <ExpandMoreIcon />
              <h5>VOICE CHANNELS</h5>
            </div>{' '}
            <AddIcon />
          </div>
          <div className='sidebar__textChannel__channel'>
            {' '}
            <span>
              <VolumeUpIcon />
            </span>{' '}
            General
          </div>
        </div>
      </div>
      <div className='sidebar__userInfo'>
        <div className='sidebar__userHeader'>
          <div className='sidebar__imageContainer'>
            <img src={user?.picture} alt='' className='sidebar__userImage' />
            <div className='sidebar__userStatus'>
              <Brightness1Icon />
            </div>
          </div>
          <div className='sidebar__userName'>{user?.nickname}</div>
        </div>

        <div className='sidebar__iconList'>
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
