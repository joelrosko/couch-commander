import { createContext, useContext, useState, useEffect } from "react";
import { apiGet } from "../services/apiService";
import { useAlerts } from '../contexts/AlertsContext';

const HouseContext = createContext();

export const useHouse = () => {
    return useContext(HouseContext);
};

export const HouseProvider = ({ children }) => {
    const [houseName, setHouseName] = useState("");
    const { toggleErrorAlert } = useAlerts();

    useEffect(() => {
        // Simulating an API call or fetching from localStorage
        const fetchHouseName = async () => {
            try {
                // Replace with your actual fetch logic (e.g., API call)
                const data = await apiGet('/house/name');
                setHouseName(data.name);
            } catch (error) {
                toggleErrorAlert();
            }
        };

        fetchHouseName();
    }, []);

    return (
        <HouseContext.Provider value={{ houseName, setHouseName }}>
            {children}
        </HouseContext.Provider>
    );
}
