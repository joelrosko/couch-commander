import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HeaderLayout from "../layouts/HeaderLayout";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import { apiGet, apiPut } from "../services/apiService";
import { useGroup } from "../contexts/GroupContext";
import { useLights } from "../contexts/LightsContext";
import BackICon from "../components/BackIcon/BackICon";
import AddingLayout from "../layouts/AddingLayout";
import SelectionCard from "../components/Cards/SelectionCard";
import CardsLayout from "../layouts/CardsLayout";
import { useAlerts } from '../contexts/AlertsContext';
import ErrorAlert from '../components/Alerts/ErrorAlert';

const AddGroupLights = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { group, updateGroup, getSpecificGroup } = useGroup();
    const { lights } = useLights();
    const [selectedLights, setSelectedLights] = useState(group.lights || []);
    const { errorAlert, toggleErrorAlert } = useAlerts();

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const data = await apiGet(`/groups/${id}`);
                updateGroup(data)
                setSelectedLights(data.lights);
            } catch (error) {
                toggleErrorAlert();
            }
        };

        if (Object.keys(group).length === 0) {
            fetchGroup();
        }
    }
    , []);

    const onUpdate = async () => {
        try {
            await apiPut(`/groups/${id}/add`, { "lights": selectedLights });
            getSpecificGroup(id);
            navigate(-1);
        } catch (error) {
            toggleErrorAlert();
        }
    }

    const onRestore = () => {
        setSelectedLights(group.lights);
    }

    const onCardClicked = (lightId) => {
        setSelectedLights((prevSelectedLights) => {
            if (prevSelectedLights.includes(lightId)) {
                return prevSelectedLights.filter((id) => id !== lightId);
            } else {
                return [...prevSelectedLights, lightId];
            }
        });
    };

  return (
    <>
        <HeaderLayout>
            <HeaderBar name={"ADD DEVICES"} section={group.name} />
        </HeaderLayout>
        <AddingLayout onAdd={onUpdate} onRestoreGroup={onRestore} />
        <BackICon />
        <CardsLayout>
            {Object.entries(lights).map(([lightId, lightData]) =>
                <SelectionCard
                    key={lightId}
                    id={lightId}
                    name={lightData.name}
                    manufacturer={lightData.manufacturer}
                    status={lightData.status}
                    onSelect={onCardClicked}
                    opacity={selectedLights.includes(lightId) ? 1 : 0.7} />
            )}
        </CardsLayout>
        {errorAlert && <ErrorAlert />}
    </>
  )
}

export default AddGroupLights;
