import HeaderBar from "../components/HeaderBar/HeaderBar"
import ColorSlider from "../components/Sliders/ColorSlider"
import BrightnessSlider from "../components/Sliders/BrightnessSlider"
import LightCard from "../components/Cards/LightCard"
import ActionLayout from "../layouts/ActionLayout"

const Lights = () => {
  return (
    <>
      <HeaderBar name={'VASAPLATSEN'} section={'LIGHTS'} />
      <ActionLayout />
      <LightCard name={'Desktop'} manufacturer={'Ikea'} status={true} />
    </>
  )
}

export default Lights