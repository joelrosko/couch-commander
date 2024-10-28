import { Dialog, DialogContentText, DialogContent, DialogActions, Button, Typography } from "@mui/material";

const ConfirmModal = ({ showModal, setShowModal, contentText, itemId, onContinue }) => {

    const handleClose = () => {
        setShowModal(false);
    };

    const handleContinue = async (itemId) => {
        await onContinue(itemId);
        handleClose();
    };

  return (
    <Dialog
    open={showModal}
    onClose={handleClose}
    >
        <DialogContent>
            <Typography variant="h3" sx={{fontSize: 28}}>Do you want to continue?</Typography>
            <DialogContentText>{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{paddingRight: 0}}>
            <Button variant='contained' sx={{ borderRadius: '7px' }} onClick={handleClose}>
                Cancel
            </Button>
            <Button onClick={() => handleContinue(itemId)} variant='contained' sx={{ background: '#d36135', color: '#ffffff', mr: '24px', borderRadius: '7px' }}>
                Continue
            </Button>
        </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
