import { useState } from 'react';
import { apiPut, apiDelete } from '../services/apiService';
import HeaderLayout from "../layouts/HeaderLayout";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import { Box, Divider, List, ListItem, Typography } from "@mui/material"
import { useLights } from "../contexts/LightsContext";
import { useAlerts } from '../contexts/AlertsContext';
import ErrorAlert from '../components/Alerts/ErrorAlert';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import ItemModal from '../components/Modals/ItemModal';
import ConfirmModal from '../components/Modals/ConfirmModal';
import BackICon from '../components/BackIcon/BackICon';

const LightSettings = () => {
  const { lights, getUpdateLights, updateSpecificLight } = useLights()
  const { errorAlert, toggleErrorAlert } = useAlerts();
  const [showModal, setShowModal] = useState(false);
  const [selectedLight, setSelectedLight] = useState({});
  const [showConfirmModal, setShowConfirmmodalModal] = useState(false);

  const indicateLight = async (lightId) => {
    try {
        await apiPut(`/light/${lightId}/indicate`, {});
    } catch (error){
        toggleErrorAlert();
    }
  };

  const editLightName = async (lightId, oldName) => {
    setSelectedLight({
        "id": lightId,
        "name": oldName
    });
    setShowModal(true);
  };

  const updateName = async (lightId, newName) => {
    try {
        await apiPut(`/light/${lightId}/name`, {"name": newName});
        updateSpecificLight(lightId);
    } catch (error){
        toggleErrorAlert();
    }
  };

  const deleteLight = (lightId) => {
    setSelectedLight({
      "id": lightId,
      "name": null
    });
    setShowConfirmmodalModal(true);
  };

  const onRemoveLight = async (lightId) => {
    try {
      await apiDelete(`/light/${lightId}/remove`);
      getUpdateLights();
    } catch (error){
      toggleErrorAlert();
    }
  };

  return (
    <>
        <HeaderLayout>
            <HeaderBar name={'LIGHTS'} section={'SETTINGS'} />
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
                    {Object.entries(lights).map(([lightId, lightsData], index, array) =>
                        <div key={lightId}>
                        <ListItem sx={{paddingBottom: '12px', paddingTop: '12px'}}>
                            <Typography variant="body1" sx={{flexGrow: 1}}>
                                {lightsData.name}
                            </Typography>
                            <WbIncandescentOutlinedIcon onClick={() => indicateLight(lightId)} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
                            <CreateOutlinedIcon onClick={() => editLightName(lightId, lightsData.name)} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
                            <DeleteOutlineOutlinedIcon onClick={() => deleteLight(lightId)} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
                        </ListItem>
                        {index < array.length - 1 && <Divider />}
                        </div>
                    )}
                </List>
            </Box>
        </Box>
        <ItemModal showModal={showModal} setShowModal={setShowModal} oldName={selectedLight.name} itemId={selectedLight.id} onSubmit={updateName} />
        <ConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmmodalModal}
        contentText="If you continue the light will be deleted"
        itemId={selectedLight.id}
        onContinue={onRemoveLight}
        />
        {errorAlert && <ErrorAlert />}
    </>
  );
};

export default LightSettings;
