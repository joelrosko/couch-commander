import { createContext, useContext, useState } from "react";

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
        <LightsContext.Provider value={{ lights, selectedLight, selectedLightName, updateLights, toggleSelectedLight }}>
            {children}
        </LightsContext.Provider>
    );
};
