import HeaderBar from "../components/HeaderBar/HeaderBar"
import ColorSlider from "../components/Sliders/ColorSlider"
import BrightnessSlider from "../components/Sliders/BrightnessSlider"

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