import { Dialog, DialogContentText, DialogContent, DialogActions, TextField, Button, Typography } from "@mui/material";
import { useState } from "react"
import { useHouse } from "../../contexts/HouseContext";

const TextModal = ({ showModal, setShowModal }) => {
    const [newName, setNewName] = useState("");
    const [error, setError] = useState("");
    const { houseName, updateName } = useHouse();

    const handleClose = () => {
        setShowModal(false);
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newName.trim()) {
            setError("Name cannot be empty");
            return;
        } else if (newName.length > 32) {
            setError("Name must be less than 32 characters");
            return;
        }

        await updateName(newName);
        setShowModal(false);
        setNewName("");
    }

  return (
    <Dialog
    open={showModal}
    onClose={handleClose}
    PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
    }}>
        <DialogContent>
            <Typography variant="h3" sx={{fontSize: 28}}>Enter new name</Typography>
            <DialogContentText>Enter a new name of the house. Maximum 32 characters.</DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="houseName"
                placeholder={houseName}
                type="text"
                fullWidth
                variant="outlined"
                value={newName}
                onChange={handleNameChange}
                error={!!error}
                helperText={error}
                sx={{
                    input: { color: '#d36135' }, // Set text color
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#d36135', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#d36135', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#d36135', // Border color when focused
                        },
                    },
                }}
            />
        </DialogContent>
        <DialogActions sx={{paddingRight: 0}}>
            <Button variant='contained' sx={{ borderRadius: '7px' }} onClick={handleClose}>Cancel</Button>
            <Button variant='contained' sx={{ background: '#d36135', color: '#ffffff', mr: '24px', borderRadius: '7px' }} type="submit">Submit</Button>
        </DialogActions>
    </Dialog>
  );
};

export default TextModal;
