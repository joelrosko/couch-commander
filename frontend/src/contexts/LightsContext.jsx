import { createContext, useContext, useState, useEffect } from "react";
import { apiGet } from "../services/apiService";

const LightsContext = createContext();

export const useLights = () => {
    return useContext(LightsContext);
};

export const LightsProvider = ({ children }) => {
    const [lights, setLights] = useState({});
    const [selectedLight, setSelectedLight] = useState(null);
    const [selectedLightName, setSelectedLightName] = useState(null);

    useEffect(() => {
        getUpdateLights();
    }, []);

    const updateLights = (newLights) => {
        setLights(newLights);
    };

    const copyUpdateLights = (newLights) => {
        setLights({...lights, ...newLights});
    };

    const getUpdateLights = async () => {
        const data = await apiGet('/lights/list'); // Fetch lights from "/lights/list"
        updateLights(data);
    };

    const updateSpecificLight = async (lightId) => {
        const data = await apiGet(`/light/${lightId}`); // Get update of specific light at "/light/<id>"
        copyUpdateLights(data)
    };

    const toggleSelectedLight = (lightId, lightName) => {
        if (selectedLight === lightId) {
            setSelectedLight(null);
            setSelectedLightName(null)
        } else {
            setSelectedLight(lightId);
            setSelectedLightName(lightName);
        }
    };

    return (
        <LightsContext.Provider value={{ lights, selectedLight, selectedLightName, updateLights, toggleSelectedLight, getUpdateLights, setSelectedLight, updateSpecificLight }}>
            {children}
        </LightsContext.Provider>
    );
};
