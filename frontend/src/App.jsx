import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { theme } from './theme/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
      <NavigationBar />
    </ThemeProvider>

  );
};

export default App;
