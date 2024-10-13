import { Card, CardContent, Typography, Box } from '@mui/material';
import LightIcon from '../../assets/bulb_icon_orange.svg?react';

const LightCard = ({ name, manufacturer, status }) => {

  const getStatusColor = (status) => {
    if (status) {
      return 'green';
    } else {
      return 'grey';
    }
  };

  const onClick = (e) => {
    console.log(e)
    console.log("Light card clicked")
  }

  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 4,
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        boxShadow: 3,
        ":hover": {
          cursor: 'pointer'
        },
        maxWidth: '250px'
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: '4px' }}>
          {name.toUpperCase()}
        </Typography>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'left',
          width: '100%',
        }}
      >
        <LightIcon style={{ width: 50, height: 50 }}/>
        <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 2
        }}
        >
          <Typography variant="body1" sx={{mb: '1px'}}>
          {manufacturer.toUpperCase()}
        </Typography>
        <Box
        sx={{
          width: 15,
          height: 15,
          borderRadius: '50%',
          backgroundColor: getStatusColor(status),
          marginTop: '1px'
        }}
      />
        </Box>
      </CardContent>
    </Card>
  );
}

export default LightCard;