import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { theme } from './theme/theme'
import { AlertsProvider } from './contexts/AlertsContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AlertsProvider>
        <Outlet />
        <NavigationBar />
      </AlertsProvider>
    </ThemeProvider>

  );
};

export default App;
