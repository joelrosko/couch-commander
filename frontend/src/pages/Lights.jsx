import { useEffect, useState } from 'react';
import HeaderBar from "../components/HeaderBar/HeaderBar"
import LightCard from "../components/Cards/LightCard"
import ActionLayout from "../layouts/ActionLayout"
import CardsLayout from "../layouts/CardsLayout"
import HeaderLayout from "../layouts/HeaderLayout"
import AddCard from "../components/Cards/AddCard"
import { apiGet } from "../services/apiService"

const Lights = () => {
  const [lights, setLights] = useState([]);

  useEffect(() => {
    const fetchLights = async () => {
      try {
        const data = await apiGet('/lights/list'); // Fetch lights from "/lights/list"
        setLights(data);
        console.log(data)
      } catch (error) {
        console.error('Failed to fetch lights:', error);
      }
    };

    fetchLights();
  }, []);



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
        <AddCard />
      </CardsLayout>
    </>
  )
}

export default Lights