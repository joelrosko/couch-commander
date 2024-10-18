import { Box } from '@mui/material';

const CardsLayout = ({  children }) => {
  return (
    <Box sx={{
        m: '20px',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '60px'
    }}>
        <Box sx={{
          paddingBottom: '6px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '10px',
            boxSizing: 'border-box',
            overflowY: 'auto'
        }}>
            {children}
        </Box>
    </Box>
  )
}

export default CardsLayout