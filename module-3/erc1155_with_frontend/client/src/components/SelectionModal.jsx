import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SimpleNftCard from "@/components/SimpleNftCard";
import { useCollection } from "@/hooks/useCollection";
import Typography from "@mui/material/Typography";
import VerticalSpacer from "./VerticalSpacer";
import { flexCenterStyle } from "@/styles/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const gridStyle = {
  display: "flex",
  gap: "10px",
  padding: "0 10px",
};

export default function SelectionModal({
  open,
  selection,
  modalData,
  handleClose,
  callback,
}) {
  const { collection, itemData } = selection;
  const { createMetadata } = useCollection(collection, itemData);

  function selectHandler(id) {
    callback(modalData.id, id);
    handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" color="primary">
          Select item to trade with
        </Typography>
        <VerticalSpacer spacing={2} />
        <Box sx={flexCenterStyle}>
          <Box sx={gridStyle}>
            {open &&
              collection.map((item, i) => {
                if (i !== modalData.id && itemData[i]) {
                  return (
                    <SimpleNftCard
                      key={i}
                      metadata={createMetadata(item, i)}
                      callback={() => selectHandler(i)}
                    />
                  );
                }
              })}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
