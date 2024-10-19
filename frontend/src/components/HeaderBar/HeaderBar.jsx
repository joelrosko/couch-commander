import { Typography, Box } from '@mui/material';

const HeaderBar = ({ name, section}) => {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        mt: 4
    }}>
        <Typography variant='h2'>{name}</Typography>
        <Typography variant='h1'>{section}</Typography>
    </Box>
  )
}

export default HeaderBar