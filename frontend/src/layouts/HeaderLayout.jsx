import { Box } from '@mui/material';

const HeaderLayout = ({ children }) => {
  return (
    <Box sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        mr: '20px',
        ml: '20px',
        paddingTop: '20px',
        background: '#d36135'
    }}>
        {children}
    </Box>
  )
}

export default HeaderLayout