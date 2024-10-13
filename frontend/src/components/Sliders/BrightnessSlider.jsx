import { Box, Slider } from '@mui/material';
import { useState } from 'react';

const BrightnessSlider = () => {
    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
      };

    const transparentGradient = `linear-gradient(90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%)`;

  return (
    <Box>
        <Slider
            value={sliderValue}
            onChange={handleSliderChange}
            min={0}
            max={100}
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