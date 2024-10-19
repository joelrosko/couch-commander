import { useEffect } from 'react';
import HeaderBar from "../components/HeaderBar/HeaderBar"
import LightCard from "../components/Cards/LightCard"
import ActionLayout from "../layouts/ActionLayout"
import CardsLayout from "../layouts/CardsLayout"
import HeaderLayout from "../layouts/HeaderLayout"
import AddCard from "../components/Cards/AddCard"
import { apiGet } from "../services/apiService"
import { LightsProvider } from '../contexts/LightsContext';
import { useLights } from '../contexts/LightsContext';
import { useAlerts } from '../contexts/AlertsContext';
import ErrorAlert from '../components/Alerts/ErrorAlert';

const LightsContent = () => {
  const { lights, selectedLight, selectedLightName, updateLights, toggleSelectedLight } = useLights();
  const { errorAlert, toggleErrorAlert } = useAlerts();

  useEffect(() => {
    const fetchLights = async () => {
      try {
        const data = await apiGet('/lights/list'); // Fetch lights from "/lights/list"
        updateLights(data);
      } catch (error) {
        toggleErrorAlert();
      }
    };

    fetchLights();
  }, []);

  const onCardClicked = (lightId, lightName) => {
    toggleSelectedLight(lightId, lightName);
  };

  const lightName = selectedLightName ? selectedLightName : 'LIGHTS';

  return (
    <>
      <HeaderLayout>
        <HeaderBar name={'VASAPLATSEN'} section={lightName} />
        {selectedLight && <ActionLayout />}
      </HeaderLayout>
      <CardsLayout>
        {Object.entries(lights).map(([lightId, lightsData]) =>
          <LightCard
            key={lightId}
            name={lightsData.name}
            manufacturer={lightsData.manufacturername.split(" ")[0]}
            status={lightsData.state.on}
            onClick={() => onCardClicked(lightId, lightsData.name, lightsData.state.on)}
            opacity={selectedLight && selectedLight !== lightId ? 0.7 : 1}
          />
        )}
        <AddCard />
      </CardsLayout>
      {errorAlert && <ErrorAlert />}
    </>
  );
};

const Lights = () => {
  return (
    <LightsProvider>
      <LightsContent />
    </LightsProvider>
  );
};

export default Lights;
