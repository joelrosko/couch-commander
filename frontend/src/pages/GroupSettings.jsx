import { useEffect, useState } from 'react';
import { apiGet, apiPut, apiDelete } from '../services/apiService';
import HeaderLayout from "../layouts/HeaderLayout";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import { Box, Divider, List, ListItem, Typography } from "@mui/material"
import { useAlerts } from '../contexts/AlertsContext';
import ErrorAlert from '../components/Alerts/ErrorAlert';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ItemModal from '../components/Modals/ItemModal';
import ConfirmModal from '../components/Modals/ConfirmModal';
import BackICon from '../components/BackIcon/BackICon';

const GroupSettings = () => {
    const [groups, setGroups] = useState({});
    const { errorAlert, toggleErrorAlert } = useAlerts();
    const [showModal, setShowModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState({});
    const [showConfirmModal, setShowConfirmmodalModal] = useState(false);

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

    const editGroupName = async (groupId, oldName) => {
        setSelectedGroup({
            "id": groupId,
            "name": oldName
        });
        setShowModal(true);
    };

    const updateName = async (groupId, newName) => {
        try {
            await apiPut(`/groups/${groupId}/name`, {"name": newName});
            const data = await apiGet('/groups/list')
            setGroups(data);
        } catch (error){
            toggleErrorAlert();
        }
    };

    const deleteGroup = (groupId) => {
        setSelectedGroup({
          "id": groupId,
          "name": null
        });
        setShowConfirmmodalModal(true);
    };

    const onRemoveGroup = async (groupId) => {
        try {
            await apiDelete(`/groups/${groupId}/remove`);
            const data = await apiGet('/groups/list')
            setGroups(data);
        } catch (error){
            toggleErrorAlert();
        }
    };

  return (
    <>
        <HeaderLayout>
            <HeaderBar name={'GROUPS'} section={'SETTINGS'} />
        </HeaderLayout>
        <BackICon />
        <Box sx={{
        m: '20px',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '60px'
        }}>
            <Box sx={{width: '100%', maxWidth: '800px'}}>
                <List sx={{background: '#ffffff', borderRadius: '7px', boxShadow: 3, paddingBottom: '0px', paddingTop: '0px'}}>
                    {Object.entries(groups).map(([groupId, groupData], index, array) =>
                    <div key={groupId}>
                        <ListItem sx={{paddingBottom: '12px', paddingTop: '12px'}}>
                        <Typography variant="body1" sx={{flexGrow: 1}}>
                            {groupData.name}
                        </Typography>
                        <CreateOutlinedIcon onClick={() => editGroupName(groupId, groupData.name)} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
                        <DeleteOutlineOutlinedIcon onClick={() => deleteGroup(groupId)} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
                        </ListItem>
                        {index < array.length - 1 && <Divider />}
                    </div>
                    )}
                </List>
            </Box>
        </Box>
        <ItemModal showModal={showModal} setShowModal={setShowModal} oldName={selectedGroup.name} itemId={selectedGroup.id} onSubmit={updateName} />
        <ConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmmodalModal}
        contentText="If you continue the group will be deleted"
        itemId={selectedGroup.id}
        onContinue={onRemoveGroup}
        />
        {errorAlert && <ErrorAlert />}
    </>
  )
}

export default GroupSettings