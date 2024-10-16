import { Button, Box } from '@mui/material';
import ColorSlider from '../components/Sliders/ColorSlider';
import BrightnessSlider from '../components/Sliders/BrightnessSlider';
import { apiPut } from '../services/apiService';
import { useLights } from '../contexts/LightsContext';

const ActionLayout = () => {
    const { lights, selectedLight, updateLights } = useLights();

    const onOffClick = async () => {
        try {
            const updatedLights = { ...lights };
            updatedLights[selectedLight].state.on = !updatedLights[selectedLight].state.on;

            const body = {
                "on": updatedLights[selectedLight].state.on
            };
            await apiPut(`/light/${selectedLight}/on`, body); // Update light state at "/light/<id>/on"

            updateLights(updatedLights);
          } catch (error) {
            console.error('Failed to fetch lights:', error);
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
        <Box sx={{ width: '100%', maxWidth: '350px' }}>
            <ColorSlider />
        </Box>
    </Box>
  )
}

export default ActionLayout