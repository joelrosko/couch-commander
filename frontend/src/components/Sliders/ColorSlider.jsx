import { Box, Slider } from '@mui/material';
import { useState } from 'react';

const ColorSlider = () => {
    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
      };

    const sliderBackground = `linear-gradient(90deg,
        red 0%,
        #FF7F00 17%,  /* Orange */
        yellow 33%,
        #00FF00 50%,  /* Green */
        cyan 67%,
        blue 83%,
        magenta 100%)`;

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
                    background: sliderBackground,
                    border: '2px solid #FFFFFF',
                },
            }}
        />
    </Box>
  )
}

export default ColorSlider