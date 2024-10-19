import { createContext, useContext, useState } from "react";

const AlertsContext = createContext();

export const useAlerts = () => {
    return useContext(AlertsContext);
};

export const AlertsProvider = ({ children }) => {
    const [errorAlert, setErrorAlert] = useState(false);
    const [infoAlert, setInfoAlert] = useState(false);

    const toggleErrorAlert = () => {
        setErrorAlert(!errorAlert);
    };

    const toggleInfoAlert = () => {
        setInfoAlert(!infoAlert);
    };

    return (
        <AlertsContext.Provider value={{ errorAlert, infoAlert, toggleErrorAlert, toggleInfoAlert}}>
            {children}
        </AlertsContext.Provider>
    );
};
