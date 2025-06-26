import { Modal, Box, Typography, Stack, Button } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function ModalCustom({ open, onClose, title, formContent, onSubmit }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {formContent}
        <Stack direction="row" spacing={1} justifyContent="flex-end" mt={3}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={onSubmit}>Save</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
