import { Box } from '@mui/material';

const CardsLayout = ({  children }) => {
  return (
    <Box sx={{
        m: '20px',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '60px',

    }}>
        <Box sx={{ maxWidth: '1200px', width: '100%' }}>
          <Box sx={{
            paddingBottom: '6px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            boxSizing: 'border-box',
            overflowY: 'auto',
            width: '100%'
          }}>
              {children}
          </Box>
        </Box>
    </Box>
  )
}

export default CardsLayout