import HeaderBar from "../components/HeaderBar/HeaderBar"
import HeaderLayout from "../layouts/HeaderLayout"
import { Box, Divider, List, ListItem, Typography } from "@mui/material"
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import TextModal from "../components/Modals/TextModal";
import { useAlerts } from '../contexts/AlertsContext';
import ErrorAlert from '../components/Alerts/ErrorAlert';
import { useHouse } from "../contexts/HouseContext";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { apiDelete } from "../services/apiService";
import ConfirmModal from "../components/Modals/ConfirmModal";

const Settings = () => {
  const { errorAlert } = useAlerts();
  const { houseName } = useHouse();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmmodalModal] = useState(false);

  const editName = () => {
    console.log("click")
  }

  const onDeleteLogs = () => {
    setShowConfirmmodalModal(true);
  }

  const removeLogs = async () => {
    try {
      await apiDelete(`/logs/`);
    } catch (error){
        toggleErrorAlert();
    }
  }

  return (
    <>
      <HeaderLayout>
        <HeaderBar name={'COUCH-COMMANDER'} section={'SETTINGS'} />
      </HeaderLayout>
      <Box sx={{
        m: '20px',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '60px'
      }}>
        <Box sx={{width: '100%', maxWidth: '800px'}}>
          <List sx={{background: '#ffffff', borderRadius: '7px', boxShadow: 3, paddingBottom: '0px', paddingTop: '0px'}}>
            <ListItem sx={{paddingBottom: '12px', paddingTop: '12px'}}>
              <Typography variant="body1" sx={{flexGrow: 1}}>
                {`Name of house: ${houseName}`}
              </Typography>
              <CreateOutlinedIcon onClick={() => setShowModal(true)} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
            </ListItem>
            <Divider />
            <ListItem sx={{paddingBottom: '12px', paddingTop: '12px'}}>
              <Typography variant="body1" sx={{flexGrow: 1}}>
                Get deConz API key
              </Typography>
              <ArrowForwardIosOutlinedIcon onClick={editName} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
            </ListItem>
            <Divider />
            <ListItem sx={{paddingBottom: '12px', paddingTop: '12px'}}>
              <Typography variant="body1" sx={{flexGrow: 1}}>
                Edit lights
              </Typography>
              <ArrowForwardIosOutlinedIcon onClick={() => navigate('/settings/lights')} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
            </ListItem>
            <Divider />
            <ListItem sx={{paddingBottom: '12px', paddingTop: '12px'}}>
              <Typography variant="body1" sx={{flexGrow: 1}}>
                Edit groups
              </Typography>
              <ArrowForwardIosOutlinedIcon onClick={() => navigate('/settings/groups')} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
            </ListItem>
            <Divider />
            <ListItem sx={{paddingBottom: '12px', paddingTop: '12px'}}>
              <Typography variant="body1" sx={{flexGrow: 1}}>
                Logs
              </Typography>
              <FormatAlignLeftOutlinedIcon onClick={() => navigate('/settings/logs')} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
              <DeleteOutlineOutlinedIcon onClick={onDeleteLogs} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
            </ListItem>
          </List>
        </Box>
      </Box>
      <TextModal showModal={showModal} setShowModal={setShowModal} />
      <ConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmmodalModal}
        contentText="If you continue all logs will be deleted"
        itemId=""
        onContinue={removeLogs}
        />
      {errorAlert && <ErrorAlert />}
    </>
  )
}

export default Settings