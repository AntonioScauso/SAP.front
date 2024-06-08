import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DefaultModal(props) {
    const { open, onClose, children } = props;
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "78%", sm: "70%", md: "50%" },
                    maxHeight: "80%",
                    overflowY: "auto",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <IconButton
                    sx={{ position: "absolute", top: "1vh", right: "1vw" }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
                {children}
            </Box>
        </Modal>
    );
};
