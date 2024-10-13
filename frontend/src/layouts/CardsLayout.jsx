import { Box } from '@mui/material';

const CardsLayout = ({  children }) => {
  return (
    <Box sx={{
        m: '20px',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '66px'
    }}>
        <Box sx={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
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