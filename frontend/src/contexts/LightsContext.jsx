import { createContext, useContext, useState } from "react";
import { apiGet } from "../services/apiService";

const LightsContext = createContext();

export const useLights = () => {
    return useContext(LightsContext);
};

export const LightsProvider = ({ children }) => {
    const [lights, setLights] = useState({});
    const [selectedLight, setSelectedLight] = useState(null);
    const [selectedLightName, setSelectedLightName] = useState(null);

    const updateLights = (newLights) => {
        setLights(newLights);
    };

    const getUpdateLights = async () => {
        const data = await apiGet('/lights/list'); // Fetch lights from "/lights/list"
        updateLights(data);
    }

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
        <LightsContext.Provider value={{ lights, selectedLight, selectedLightName, updateLights, toggleSelectedLight, getUpdateLights, setSelectedLight }}>
            {children}
        </LightsContext.Provider>
    );
};
