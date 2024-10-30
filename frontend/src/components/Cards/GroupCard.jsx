import { Card, CardContent, Typography, Box } from '@mui/material';
import GroupIcon from '../../assets/rooms_icob.svg?react';

const GroupCard = ({ name, allOn, onClick, nDevices}) => {

  const getStatusColor = (allOn) => {
    if (allOn) {
        return '#d36135';
    } else {
        return 'grey';
    }
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        boxShadow: 3,
        ":hover": {
          cursor: 'pointer'
        },
        width: '142px',
        borderRadius: '7px',
        paddingBottom: '6px',
      }}
    >
      <Typography
      variant="h3"
      sx={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
      }}>
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
        <GroupIcon style={{ width: 50, height: 50 }}/>
        <Box
        sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 2
        }}
        >
          <Typography variant="body1" sx={{mb: '0px'}}>
          Devices: {nDevices}
        </Typography>
        <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: getStatusColor(allOn)
        }}
      />
        </Box>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
