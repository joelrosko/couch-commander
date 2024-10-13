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
        flexGrow: 1,
        padding: '6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 3,
        ":hover": {
          cursor: 'pointer'
        },
        maxWidth: '250px',
        borderRadius: '4px'
      }}>
        <AddIcon style={{ color: '#d36135', width: 60, height: 60 }} />
    </Card>
  )
}

export default AddCard
