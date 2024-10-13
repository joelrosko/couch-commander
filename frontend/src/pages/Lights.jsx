import HeaderBar from "../components/HeaderBar/HeaderBar"
import LightCard from "../components/Cards/LightCard"
import ActionLayout from "../layouts/ActionLayout"
import CardsLayout from "../layouts/CardsLayout"
import HeaderLayout from "../layouts/HeaderLayout"

const Lights = () => {
  return (
    <>
      <HeaderLayout>
        <HeaderBar name={'VASAPLATSEN'} section={'LIGHTS'} />
        <ActionLayout />
      </HeaderLayout>
      <CardsLayout>
        <LightCard name={'Desktop'} manufacturer={'Ikea'} status={true} />
        <LightCard name={'Roof'} manufacturer={'Ikea'} status={false} />
        <LightCard name={'Roof'} manufacturer={'Ikea'} status={false} />
        <LightCard name={'Roof'} manufacturer={'Ikea'} status={false} />
        <LightCard name={'Roof'} manufacturer={'Ikea'} status={false} />
        <LightCard name={'Roof'} manufacturer={'Ikea'} status={false} />
        <LightCard name={'Roof'} manufacturer={'Ikea'} status={false} />
        <LightCard name={'Roof'} manufacturer={'Ikea'} status={false} />
        <LightCard name={'Roof'} manufacturer={'Ikea'} status={false} />
      </CardsLayout>
    </>
  )
}

export default Lights