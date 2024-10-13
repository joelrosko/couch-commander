import HeaderBar from "../components/HeaderBar/HeaderBar"
import ColorSlider from "../components/Sliders/ColorSlider"
import BrightnessSlider from "../components/Sliders/BrightnessSlider"
import LightCard from "../components/Cards/LightCard"

const Lights = () => {
  return (
    <>
      <HeaderBar name={'VASAPLATSEN'} section={'LIGHTS'} />
      <ColorSlider />
      <BrightnessSlider />
      <LightCard name={'Desktop'} manufacturer={'Ikea'} status={true} />
    </>
  )
}

export default Lights