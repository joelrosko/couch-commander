import { createContext, useContext, useState } from "react";
import { apiGet } from "../services/apiService";

const GroupContext = createContext();

export const useGroup = () => {
    return useContext(GroupContext);
};

export const GroupProvider = ({ children }) => {
    const [group, setGroup] = useState({});
    const [controlGroup, setControlGroup] = useState(true);

    const updateGroup = (newGroup) => {
        setGroup(newGroup);
    };

    const getSpecificGroup = async (groupId) => {
        const data = await apiGet(`/groups/${groupId}`); // Fetch group from "/groups/<id>"
        updateGroup(data);
    };

    return (
        <GroupContext.Provider value={{ group, controlGroup, updateGroup, setControlGroup, getSpecificGroup }}>
            {children}
        </GroupContext.Provider>
    );
};
