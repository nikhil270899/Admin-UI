import { Button, Box, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #eee8e8;",
  boxShadow: 24,
  p: 5,
  display: "flex",
  flexDirection: "column",
};

function UpdateAdmin(props) {
  const { sentUpdatedData, dataToUpdate, handleOpen, setHandleClose } = props;
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    role: "",
  });
  //Close modal on clicking outside of the modal
  const handleClose = () => {
    setHandleClose(false);
  };
  //Update the details and close the modal
  const updateAdminHandler = () => {
    sentUpdatedData(updatedData);
    handleClose();
  };

  //Sending updated data to its parent
  useEffect(() => {
    setUpdatedData(dataToUpdate);
  }, [dataToUpdate]);
  return (
    <div>
      <Modal
        open={handleOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="update-details">Update Details</p>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            sx={{ mt: 4 }}
            value={updatedData?.name}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, name: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ mt: 4 }}
            value={updatedData?.email}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, email: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Role"
            variant="outlined"
            sx={{ mt: 4 }}
            value={updatedData?.role}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, role: e.target.value })
            }
          />
          <Button
            id="button-wrapper"
            variant="contained"
            onClick={updateAdminHandler}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
export default UpdateAdmin;
