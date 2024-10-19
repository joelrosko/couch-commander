import { Button, Box } from '@mui/material';
import ColorSlider from '../components/Sliders/ColorSlider';
import BrightnessSlider from '../components/Sliders/BrightnessSlider';
import { apiPut } from '../services/apiService';
import { useLights } from '../contexts/LightsContext';
import { useAlerts } from '../contexts/AlertsContext';

const ActionLayout = () => {
    const { lights, selectedLight, updateLights } = useLights();
    const { toggleErrorAlert } = useAlerts();

    const onOffClick = async () => {
        try {
            const updatedLights = { ...lights };
            updatedLights[selectedLight].status = !updatedLights[selectedLight].status;

            const body = {
                "on": updatedLights[selectedLight].status
            };
            await apiPut(`/light/${selectedLight}/on`, body); // Update light state at "/light/<id>/on"

            updateLights(updatedLights);
          } catch (error) {
            toggleErrorAlert();
          }
    }

    const classicModeClick = () => {
        console.log("Classic mode click")
    }

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
            <Button onClick={onOffClick} variant='contained' sx={{ width: '50%', mr: 1, borderRadius: '7px' }}>On / Off</Button>
            <Button onClick={classicModeClick} variant='contained' sx={{ width: '50%', ml: 1, borderRadius: '7px' }}>Classic mode</Button>
        </Box>
        <Box sx={{ width: '100%', maxWidth: '350px' }}>
            <BrightnessSlider />
        </Box>
        {lights[selectedLight].multicolor &&
        <Box sx={{ width: '100%', maxWidth: '350px' }}>
            <ColorSlider />
        </Box>
        }
    </Box>
  )
}

export default ActionLayout