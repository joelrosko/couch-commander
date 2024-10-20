import { createContext, useContext, useState } from "react";

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

    return (
        <GroupContext.Provider value={{ group, controlGroup, updateGroup, setControlGroup }}>
            {children}
        </GroupContext.Provider>
    );
};
