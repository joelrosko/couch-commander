import { Box, Slider } from '@mui/material';
import { useLights } from '../../contexts/LightsContext';
import { apiPut } from '../../services/apiService';
import { useAlerts } from '../../contexts/AlertsContext';

const BrightnessSlider = () => {
    const { lights, selectedLight, updateLights } = useLights();
    const { toggleErrorAlert } = useAlerts();

    const handleSliderChange = async (e, newValue) => {
        try {
            const updatedLights = { ...lights };
            updatedLights[selectedLight].bri = newValue;

            const body = {
                "bri": updatedLights[selectedLight].bri
            };
            await apiPut(`/light/${selectedLight}/bri`, body); // Update light bri at "/light/<id>/bri"

            updateLights(updatedLights);
        } catch (error) {
            toggleErrorAlert();
          }
      };

    const transparentGradient = `linear-gradient(90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%)`;

  return (
    <Box>
        <Slider
            value={lights[selectedLight].bri}
            onChange={handleSliderChange}
            min={1}
            max={255}
            disabled={!lights[selectedLight].status}
            sx={{
                '& .MuiSlider-thumb': {
                    backgroundColor: '#FFFFFF',
                    opacity: 0.7
                },
                '& .MuiSlider-track': {
                    border: 'none',
                    opacity: 0
                },
                '& .MuiSlider-rail': {
                    height: 10,
                    opacity: 1,
                    background: transparentGradient,
                    border: '2px solid #FFFFFF',
                },
            }}
        />
    </Box>
  )
}

export default BrightnessSlider