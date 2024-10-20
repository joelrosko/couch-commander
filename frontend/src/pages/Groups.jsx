import { useEffect, useState } from 'react';
import HeaderBar from "../components/HeaderBar/HeaderBar"
import { useAlerts } from '../contexts/AlertsContext';
import { apiGet } from '../services/apiService';
import HeaderLayout from '../layouts/HeaderLayout';
import CardsLayout from '../layouts/CardsLayout';
import GroupCard from '../components/Cards/GroupCard';
import AddCard from '../components/Cards/AddCard';
import ErrorAlert from '../components/Alerts/ErrorAlert';
import { useNavigate } from 'react-router-dom';

const Groups = () => {
  const [groups, setGroups] = useState({});
  const { errorAlert, toggleErrorAlert } = useAlerts();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await apiGet('/groups/list')
        setGroups(data);
      } catch (error) {
        toggleErrorAlert();
      }
    };

    fetchGroups();
  }, []);

  const onCardClicked = (groupId) => {
    navigate(`/groups/${groupId}`);
  }

  return (
    <>
      <HeaderLayout>
        <HeaderBar name={'VASAPLATSEN'} section={'GROUPS'} />
      </HeaderLayout>
      <CardsLayout>
        {Object.entries(groups).map(([groupId, groupData]) =>
          <GroupCard
            key={groupId}
            name={groupData.name}
            allOn={groupData.allOn}
            onClick={() => onCardClicked(groupId)}
            nDevices={groupData.nDevices}
          />
        )}
        <AddCard />
      </CardsLayout>
      {errorAlert && <ErrorAlert />}
    </>
  )
}

export default Groups
