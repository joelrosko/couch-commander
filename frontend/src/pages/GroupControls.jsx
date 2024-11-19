import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { apiPut } from "../services/apiService"
import { useAlerts } from '../contexts/AlertsContext';
import ErrorAlert from '../components/Alerts/ErrorAlert';
import HeaderLayout from '../layouts/HeaderLayout';
import HeaderBar from '../components/HeaderBar/HeaderBar';
import ActionLayout from '../layouts/ActionLayout';
import CardsLayout from '../layouts/CardsLayout';
import LightCard from '../components/Cards/LightCard';
import AddCard from '../components/Cards/AddCard';
import { useLights } from '../contexts/LightsContext';
import { useGroup } from '../contexts/GroupContext';
import { useHouse } from '../contexts/HouseContext';
import BackICon from '../components/BackIcon/BackICon';
import { useNavigate } from 'react-router-dom';

const GroupControls = () => {
  const { id } = useParams();
  const { errorAlert, toggleErrorAlert } = useAlerts();
  const { lights, selectedLight, toggleSelectedLight, setSelectedLight, copyUpdateLights, updateSpecificLight } = useLights();
  const { group, controlGroup, setControlGroup, getSpecificGroup } = useGroup();
  const { houseName } = useHouse();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroup = async () => {
        try {
          await getSpecificGroup(id)
        } catch (error) {
            toggleErrorAlert();
        }
    };

    setSelectedLight(null);
    setControlGroup(true);
    fetchGroup();
  }, []);

  const onCardClicked = (lightId, lightName) => {
    toggleSelectedLight(lightId, lightName);
    if (selectedLight === lightId) {
        setControlGroup(true)
    } else {
        setControlGroup(false);
    }
  };

  const onOffClick = async () => {
    try {
        if (controlGroup) {
            await apiPut(`/groups/${id}/on`, {});   // Toggle light state at "/groups/<id>/on"

            const body = {
              "lights": group.lights,
            };
            const res = await apiPut("/groups/lights", body);

            copyUpdateLights(res);
        } else {
            newStatus = !lights[selectedLight].status;
            const body = {
                "on": newStatus
            };
            await apiPut(`/light/${selectedLight}/on`, body); // Update light state at "/light/<id>/on"

            updateSpecificLight(selectedLight);
        }
    } catch (error) {
        toggleErrorAlert();
    }
  };

  return (
    <>
      <HeaderLayout>
        <HeaderBar name={houseName.toUpperCase()} section={group.name} />
        {group.lights && group.lights.length > 0 && <ActionLayout multicolor={group.multicolor} onOffClick={onOffClick} />}
      </HeaderLayout>
      <BackICon />
      <CardsLayout>
        {group.lights && group.lights.map((lightId) => {
            const lightData = lights[lightId];
            if (!lightData) return null; // Skip if light data not found for this ID

            return (
              <LightCard
                key={lightId}
                name={lightData.name}
                manufacturer={lightData.manufacturer}
                status={lightData.status}
                onClick={() => onCardClicked(lightId, lightData.name)}
                opacity={selectedLight && selectedLight !== lightId ? 0.7 : 1}
              />
            );
          })}
          <AddCard handleClick={() => navigate(`/groups/${id}/add`)} />
      </CardsLayout>
      {errorAlert && <ErrorAlert />}
    </>
  );
};

export default GroupControls
