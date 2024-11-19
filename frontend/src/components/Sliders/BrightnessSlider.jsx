import { Box, Slider } from '@mui/material';
import { useLights } from '../../contexts/LightsContext';
import { apiPut } from '../../services/apiService';
import { useAlerts } from '../../contexts/AlertsContext';
import { useGroup } from '../../contexts/GroupContext';

const BrightnessSlider = () => {
    const { lights, selectedLight, updateSpecificLight } = useLights();
    const { toggleErrorAlert } = useAlerts();
    const { group, controlGroup, getSpecificGroup } = useGroup();

    const isLightSelected = selectedLight !== null;

    const handleSliderChange = async (e, newValue) => {
        try {
            if (isLightSelected) {
                const body = {
                    "bri": newValue
                };
                await apiPut(`/light/${selectedLight}/bri`, body); // Update light bri at "/light/<id>/bri"

                updateSpecificLight();
            } else {
                const body = {
                    "bri": newValue
                };
                await apiPut(`/groups/${group.id}/bri`, body);

                getSpecificGroup(group.id);
            }
        } catch (error) {
            toggleErrorAlert();
          }
      };

  const isDisabled = isLightSelected
        ? !lights[selectedLight]?.status
        : false;

    const transparentGradient = `linear-gradient(90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%)`;

    return (
        <Box>
            <Slider
                value={controlGroup ? group?.bri || 1 : lights[selectedLight]?.bri || 1}
                onChange={handleSliderChange}
                min={1}
                max={255}
                disabled={isDisabled}
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