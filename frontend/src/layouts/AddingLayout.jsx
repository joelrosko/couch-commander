import { Button, Box } from '@mui/material';

const AddingLayout = ({ onAdd, onRestoreGroup }) => {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '20px',
        alignItems: 'center',
    }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            maxWidth: '350px',
            mb: 1
        }}>
            <Button onClick={() => onAdd()} variant='contained' sx={{ width: '50%', mr: 1, borderRadius: '7px' }}>Update</Button>
            <Button onClick={() => onRestoreGroup()} variant='contained' sx={{ width: '50%', ml: 1, borderRadius: '7px' }}>Restore</Button>
        </Box>
    </Box>
  );
};

export default AddingLayout;
