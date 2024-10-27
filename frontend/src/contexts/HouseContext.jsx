import { createContext, useContext, useState, useEffect } from "react";
import { apiGet, apiPut } from "../services/apiService";
import { useAlerts } from '../contexts/AlertsContext';

const HouseContext = createContext();

export const useHouse = () => {
    return useContext(HouseContext);
};

export const HouseProvider = ({ children }) => {
    const [houseName, setHouseName] = useState("");
    const { toggleErrorAlert } = useAlerts();

    useEffect(() => {
        const fetchHouseName = async () => {
            try {
                const data = await apiGet('/house/name');
                setHouseName(data.name);
            } catch (error) {
                toggleErrorAlert();
            }
        };

        fetchHouseName();
    }, []);

    const updateName = async (newName) => {
        try {
            await apiPut('/house/name', {"name": newName});
            setHouseName(newName);
        } catch (error) {
            toggleErrorAlert();
        }
    }

    return (
        <HouseContext.Provider value={{ houseName, setHouseName, updateName }}>
            {children}
        </HouseContext.Provider>
    );
}
