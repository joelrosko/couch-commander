import { BottomNavigation, BottomNavigationAction, Box, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import LightIcon from '../../assets/bulb_icon_orange.svg?react';
import GroupIcon from '../../assets/rooms_icob.svg?react';
import SettingsIcon from '../../assets/settings_icon.svg?react';

const NavigationBar = () => {

  const location = useLocation(); // To track current route

  const getBasePath = () => {
    if (location.pathname.startsWith('/settings')) return '/settings';
    if (location.pathname.startsWith('/groups')) return '/groups';
    return '/'; // default to home path if no match
  };

  const activePath = getBasePath();

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }} elevation={3}>
      <BottomNavigation showLabels value={activePath}>
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Lights" // Show text if not a phone
          icon={<LightIcon style={{ width: 28, height: 28 }} />}
          value="/"
        />
        <BottomNavigationAction
          component={Link}
          to="/groups"
          label="Groups"
          icon={<GroupIcon style={{ width: 28, height: 28 }} />}
          value="/groups"
        />
        <BottomNavigationAction
          component={Link}
          to="/settings"
          label="Settings"
          icon={<SettingsIcon style={{ width: 28, height: 28 }} />}
          value="/settings"
        />
      </BottomNavigation>
    </Box>
  )
}

export default NavigationBar