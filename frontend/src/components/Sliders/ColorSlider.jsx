import { Box, Slider } from '@mui/material';
import { useLights } from '../../contexts/LightsContext';
import { apiPut } from '../../services/apiService';
import { useAlerts } from '../../contexts/AlertsContext';
import { useGroup } from '../../contexts/GroupContext';

const ColorSlider = () => {
    const { lights, selectedLight, updateLights } = useLights();
    const { toggleErrorAlert } = useAlerts();
    const { group, controlGroup, updateGroup } = useGroup();

    const isLightSelected = selectedLight !== null;

    const handleSliderChange = async (e, newValue) => {
        try {
            if (isLightSelected) {
                const updatedLights = { ...lights };
                updatedLights[selectedLight].color = newValue;

                const body = {
                    "hue": updatedLights[selectedLight].color
                };
                await apiPut(`/light/${selectedLight}/hue`, body); // Update light color at "/light/<id>/hue"

                updateLights(updatedLights);
            } else {
                const updatedGroup = { ...group };
                updatedGroup.color = newValue;

                const body = {
                    "hue": updatedGroup.color
                };
                await apiPut(`/groups/${group.id}/hue`, body);

                updateGroup(updatedGroup);
            }
        } catch (error) {
            toggleErrorAlert();
          }
    };

    const isDisabled = isLightSelected
        ? !lights[selectedLight]?.status
        : false;

    const sliderBackground = `linear-gradient(90deg,
        red 0%,              /* 0° */
        #FF7F00 16.67%,     /* ~30° (Orange) */
        yellow 33.33%,      /* 60° */
        #00FF00 50%,        /* 120° (Green) */
        cyan 66.67%,        /* 180° */
        blue 83.33%,        /* 240° */
        magenta 100%)       /* 300° */`;

  return (
    <Box>
        <Slider
            value={controlGroup ? group?.color || 1 : lights[selectedLight]?.color || 1}
            onChange={handleSliderChange}
            min={0}
            max={360}
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
                    background: sliderBackground,
                    border: '2px solid #FFFFFF',
                },
            }}
        />
    </Box>
  )
}

export default ColorSlider