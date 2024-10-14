import { Card, CardContent, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddCard = () => {

  const onClick = (e) => {
    console.log(e)
    console.log("Add card clicked")
  }

  return (
    <Card
      onClick={onClick}
      sx={{
        padding: '10px',
        paddingBottom: '6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 3,
        ":hover": {
          cursor: 'pointer'
        },
        width: '142px',
        borderRadius: '7px'
      }}>
        <AddIcon style={{ color: 'grey', width: 60, height: 60 }} />
    </Card>
  )
}

export default AddCard
