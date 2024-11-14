import { Card, CardContent, Typography, Box } from '@mui/material';
import LightIcon from '../../assets/bulb_icon_orange.svg?react';
import { useState, useRef } from 'react';
import { useAlerts } from '../../contexts/AlertsContext';
import { apiPut } from '../../services/apiService';

const SelectionCard = ({ id, name, manufacturer, status, onSelect, opacity }) => {
    const { toggleErrorAlert } = useAlerts();
    const [isHolding, setIsHolding] = useState(false);
    const holdTimeout = useRef(null);
    const shouldPreventClick = useRef(false);

    const getStatusColor = (status) => {
        if (status) {
          return '#d36135';
        } else {
          return 'grey';
        }
      };

    const indicateLight = async () => {
        try {
            await apiPut(`/light/${id}/indicate`, {}); // Indicate light at "/light/<id>/indicate"
        } catch (error) {
            toggleErrorAlert();
        }
    };

    const handleMouseDown = () => {
        holdTimeout.current = setTimeout(() => {
          setIsHolding(true);
          shouldPreventClick.current = true;
          indicateLight();
        }, 500); // 500ms threshold for "hold"
    };

    const handleMouseUp = () => {
        clearTimeout(holdTimeout.current);
        holdTimeout.current = null;
        if (isHolding) {
          setIsHolding(false);
        }
    };

    const handleHoldStart = () => {
        holdTimeout.current = setTimeout(() => {
            setIsHolding(true);
            shouldPreventClick.current = true;
            indicateLight();
        }, 500);
    };

    const handleHoldEnd = () => {
        clearTimeout(holdTimeout.current);
        holdTimeout.current = null;
        if (isHolding) {
            setIsHolding(false);
        }
    };

    const handleClick = (event) => {
        if (shouldPreventClick.current) {
          event.preventDefault(); // Prevent click after hold
          shouldPreventClick.current = false;
        } else {
            onSelect(id);
        }
    };

  return (
    <Card
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleHoldEnd}
    onTouchStart={handleHoldStart}
    onTouchEnd={handleHoldEnd}
    onTouchCancel={handleHoldEnd}
    onClick={handleClick}
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
        opacity: opacity,
        transition: 'opacity 0.3s ease'
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
          {name}
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
          <Typography variant="body1" sx={{mb: '0px'}}>
          {manufacturer}
        </Typography>
        <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: getStatusColor(status)
        }}
      />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SelectionCard;
