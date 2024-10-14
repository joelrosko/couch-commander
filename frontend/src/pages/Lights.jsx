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
  const [selected, setSelected] = useState("");
  const [selectedLightName, setSelectedLightName] = useState("LIGHTS");
  const [selectedLightState, setSelectedLightState] = useState(null);

  useEffect(() => {
    const fetchLights = async () => {
      try {
        const data = await apiGet('/lights/list'); // Fetch lights from "/lights/list"
        const lightsArray = Object.entries(data.data);
        setLights(lightsArray);
        console.log(lightsArray)
      } catch (error) {
        console.error('Failed to fetch lights:', error);
      }
    };

    fetchLights();
  }, []);

  const onCardClicked = (lightId, name, status) => {
    if (selected == lightId) {
      setSelected("");
      setSelectedLightName("LIGHTS");
      setSelectedLightState(null);
    } else {
      setSelected(lightId);
      setSelectedLightName(name.toUpperCase());
      setSelectedLightState(status);
    }
  };

  return (
    <>
      <HeaderLayout>
        <HeaderBar name={'VASAPLATSEN'} section={selectedLightName} />
        {selected && <ActionLayout lightId={selected} status={selectedLightState} />}
      </HeaderLayout>
      <CardsLayout>
        {lights.map(([lightId, lightsData]) =>
          <LightCard
            key={lightId}
            name={lightsData.name}
            manufacturer={lightsData.manufacturername.split(" ")[0]}
            status={lightsData.state.on}
            onClick={() => onCardClicked(lightId, lightsData.name, lightsData.state.on)}
            opacity={selected && selected !== lightId ? 0.7 : 1}
          />
        )}

        <AddCard />
      </CardsLayout>
    </>
  )
}

export default Lights