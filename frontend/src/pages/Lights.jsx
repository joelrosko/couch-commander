import { useEffect } from 'react';
import HeaderBar from "../components/HeaderBar/HeaderBar"
import LightCard from "../components/Cards/LightCard"
import ActionLayout from "../layouts/ActionLayout"
import CardsLayout from "../layouts/CardsLayout"
import HeaderLayout from "../layouts/HeaderLayout"
import AddCard from "../components/Cards/AddCard"
import { useLights } from '../contexts/LightsContext';
import { useAlerts } from '../contexts/AlertsContext';
import ErrorAlert from '../components/Alerts/ErrorAlert';
import { apiPut } from '../services/apiService';
import { useGroup } from '../contexts/GroupContext';
import { useHouse } from '../contexts/HouseContext';

const Lights = () => {
  const { lights, selectedLight, selectedLightName, toggleSelectedLight, setSelectedLight, updateSpecificLight } = useLights();
  const { errorAlert, toggleErrorAlert } = useAlerts();
  const { setControlGroup } = useGroup();
  const { houseName } = useHouse();

  useEffect(() => {
    setControlGroup(false);
    setSelectedLight(null);
  }, []);

  const onCardClicked = (lightId, lightName) => {
    toggleSelectedLight(lightId, lightName);
  };

  const onOffClick = async () => {
    try {
        newStatus = !lights[selectedLight].status;
        const body = {
            "on": newStatus
        };
        await apiPut(`/light/${selectedLight}/on`, body); // Update light state at "/light/<id>/on"

        updateSpecificLight(selectedLight);
      } catch (error) {
        toggleErrorAlert();
      }
}

  const lightName = selectedLightName ? selectedLightName : 'LIGHTS';

  return (
    <>
      <HeaderLayout>
        <HeaderBar name={houseName.toUpperCase()} section={lightName} />
        {selectedLight && <ActionLayout multicolor={lights[selectedLight].multicolor} onOffClick={onOffClick} />}
      </HeaderLayout>
      <CardsLayout>
        {Object.entries(lights).map(([lightId, lightsData]) =>
          <LightCard
            key={lightId}
            name={lightsData.name}
            manufacturer={lightsData.manufacturer}
            status={lightsData.status}
            onClick={() => onCardClicked(lightId, lightsData.name)}
            opacity={selectedLight && selectedLight !== lightId ? 0.7 : 1}
          />
        )}
        <AddCard />
      </CardsLayout>
      {errorAlert && <ErrorAlert />}
    </>
  );
};

export default Lights;
