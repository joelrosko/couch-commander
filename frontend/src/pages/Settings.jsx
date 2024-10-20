import HeaderBar from "../components/HeaderBar/HeaderBar"
import HeaderLayout from "../layouts/HeaderLayout"
import { Box, Divider, List, ListItem, Typography } from "@mui/material"
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';

const Settings = () => {

  const editName = () => {
    console.log("edit name")
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
          <List sx={{background: '#ffffff', borderRadius: '7px'}}>
            <ListItem>
              <Typography variant="body1" sx={{flexGrow: 1}}>
                Name of house: Vasaplatsen
              </Typography>
              <CreateOutlinedIcon onClick={editName} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
            </ListItem>
            <Divider />
            <ListItem>
              <Typography variant="body1" sx={{flexGrow: 1}}>
                Get deConz API key
              </Typography>
              <ArrowForwardIosOutlinedIcon onClick={editName} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
            </ListItem>
            <Divider />
            <ListItem>
              <Typography variant="body1" sx={{flexGrow: 1}}>
                Edit lights
              </Typography>
              <ArrowForwardIosOutlinedIcon onClick={editName} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
            </ListItem>
            <Divider />
            <ListItem>
              <Typography variant="body1" sx={{flexGrow: 1}}>
                Edit groups
              </Typography>
              <ArrowForwardIosOutlinedIcon onClick={editName} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
            </ListItem>
            <Divider />
            <ListItem>
              <Typography variant="body1" sx={{flexGrow: 1}}>
                Logs
              </Typography>
              <FormatAlignLeftOutlinedIcon onClick={editName} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
              <DeleteOutlineOutlinedIcon onClick={editName} sx={{color: '#d36135', '&:hover': {cursor: 'pointer'}, ml: '8px'}} />
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  )
}

export default Settings