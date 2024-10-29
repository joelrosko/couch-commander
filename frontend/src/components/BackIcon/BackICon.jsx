import { IconButton } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from 'react-router-dom';

const BackICon = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
      };

  return (
    <IconButton
      onClick={handleBack}
      sx={{
        position: 'fixed',
        padding: 0,
        top: '49px',
        left: '20px',
        zIndex: 1000,
      }}
    >
      <ArrowBackOutlinedIcon style={{ width: 30, height: 26, color: '#FFFFFF' }} />
    </IconButton>
  )
}

export default BackICon