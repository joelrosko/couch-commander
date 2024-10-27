import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
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
      divider: '#d36135',
    },
    typography: {
      h1: {
        color: '#ffffff',
        fontFamily: 'Albert Sans', // Use the bold font for h1
        fontWeight: 900,
        fontSize: '36px',
        '&:hover': {
          cursor: 'default',  // This changes the cursor on hover
        }
      },
      h2: {
        color: '#ffffff',
        fontFamily: 'Albert Sans', // Use the bold font for h2
        fontWeight: 900,
        fontSize: '16px',
        '&:hover': {
          cursor: 'default',  // This changes the cursor on hover
        }
      },
      h3: {
        color: '#d36135',
        fontFamily: 'Albert Sans', // Use the bold font for h2
        fontWeight: 900,
        fontSize: '16px',
        '&:hover': {
          cursor: 'default',  // This changes the cursor on hover
        }
      },
      body1: {
        fontFamily: 'Albert Sans', // Use the regular weight for body text
        fontWeight: 500,
        fontSize: '16px',
        color: '#d36135',
        '&:hover': {
          cursor: 'default',  // This changes the cursor on hover
        }
      },
      body2: {
        fontFamily: 'Albert Sans', // Use the regular weight for smaller body text
        fontWeight: 500,
        '&:hover': {
          cursor: 'default',  // This changes the cursor on hover
        }
      },
      // Apply custom font styles to other elements as needed
    },
    components: {
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              color: '#d36135'
            }
          },
          label: {
            fontFamily: 'Albert Sans',
            fontWeight: 500, // Apply the regular font to BottomNavigation labels
            fontSize: '12px', // Adjust font size if necessary
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '0px',
            '&:last-child': { // Also ensure last child padding is reset
            padding: 0,
          },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: 'Albert Sans',
            fontWeight: 900
          },
        },
      },
    },
});
