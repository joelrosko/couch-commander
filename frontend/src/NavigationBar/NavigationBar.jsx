import { BottomNavigation, BottomNavigationAction, Box, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import LightIcon from '../assets/bulb_icon_orange.svg?react';
import GroupIcon from './../assets/rooms_icob.svg?react';
import SettingsIcon from './../assets/settings_icon.svg?react';

const NavigationBar = () => {

  const location = useLocation(); // To track current route

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }} elevation={3}>
      <BottomNavigation showLabels value={location.pathname}>
        <BottomNavigationAction
          component={Link}
          to="/lights"
          label="Lights" // Show text if not a phone
          icon={<LightIcon style={{ width: 28, height: 28 }} />}
          value="/lights"
        />
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} orientation="vertical" flexItem /> {/* Divider between buttons */}
        <BottomNavigationAction
          component={Link}
          to="/groups"
          label="Groups"
          icon={<GroupIcon style={{ width: 28, height: 28 }} />}
          value="/groups"
        />
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} orientation="vertical" flexItem /> {/* Divider between buttons */}
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