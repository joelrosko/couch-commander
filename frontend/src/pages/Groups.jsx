import { useEffect, useState } from 'react';
import HeaderBar from "../components/HeaderBar/HeaderBar"
import { useAlerts } from '../contexts/AlertsContext';
import { apiGet, apiPost } from '../services/apiService';
import HeaderLayout from '../layouts/HeaderLayout';
import CardsLayout from '../layouts/CardsLayout';
import GroupCard from '../components/Cards/GroupCard';
import AddCard from '../components/Cards/AddCard';
import ErrorAlert from '../components/Alerts/ErrorAlert';
import { useNavigate } from 'react-router-dom';
import { useHouse } from '../contexts/HouseContext';
import ItemModal from '../components/Modals/ItemModal';

const Groups = () => {
  const [groups, setGroups] = useState({});
  const { errorAlert, toggleErrorAlert } = useAlerts();
  const { houseName } = useHouse();
  const [showModal, setShowModal] = useState(false);
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
  };

  const onAddCardClicked = () => {
    setShowModal(true);
  };

  const addGroup = async (_, groupName) => {
    try {
      await apiPost('/groups/create', {"name": groupName});
      const data = await apiGet('/groups/list')
      setGroups(data);
    } catch (error){
      toggleErrorAlert();
    }
  };

  return (
    <>
      <HeaderLayout>
        <HeaderBar name={houseName.toUpperCase()} section={'GROUPS'} />
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
        <AddCard handleClick={onAddCardClicked} />
      </CardsLayout>
      {showModal &&
      <ItemModal
      showModal={showModal}
      setShowModal={setShowModal}
      oldName="Enter name"
      itemId={null}
      onSubmit={addGroup}
      />}
      {errorAlert && <ErrorAlert />}
    </>
  );
};

export default Groups;
