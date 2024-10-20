import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { theme } from './theme/theme'
import { AlertsProvider } from './contexts/AlertsContext';
import { LightsProvider } from './contexts/LightsContext';
import { GroupProvider } from './contexts/GroupContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AlertsProvider>
        <LightsProvider>
          <GroupProvider>
            <Outlet />
          </GroupProvider>
        </LightsProvider>
        <NavigationBar />
      </AlertsProvider>
    </ThemeProvider>

  );
};

export default App;
