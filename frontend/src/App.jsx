import './App.css';
import { Outlet } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import Button from '@mui/material/Button';

function App() {

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#ffffff',
        light: 'rgba(255,255,255,0.7)',
        contrastText: '#d36135'
      },
      secondary: {
        main: '#d36135',
        light: 'rgba(219,128,93,0.7)',
        contrastText: '#FFFFFF'
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#D36135',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <h1>Hej test</h1>
      <Button variant='contained'>Primary</Button>
      <Outlet />
    </ThemeProvider>
  )
}

export default App
