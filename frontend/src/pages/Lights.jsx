import HeaderBar from "../HeaderBar/HeaderBar"
import ColorSlider from "../Sliders/ColorSlider"
import BrightnessSlider from "../Sliders/BrightnessSlider"

const Lights = () => {
  return (
    <>
      <HeaderBar name={'VASAPLATSEN'} section={'LIGHTS'} />
      <ColorSlider />
      <BrightnessSlider />
    </>
  )
}

export default Lights