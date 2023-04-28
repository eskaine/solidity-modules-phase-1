import { useState } from "react";
import { useWeb3Modal } from "@web3modal/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ImageButtonPanel from "@/components/ImageButtonPanel";
import RoundedButton from "@/components/RoundedButton";
import VerticalSpacer from "@/components/VerticalSpacer";
import { blue } from "@mui/material/colors";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 5,
};

const typoStyle = {
  fontFamily: "ubuntu",
  color: blue[600]
};

export default function Wallets() {
  const [openModal, setModalOpen] = useState(false);
  const { open } = useWeb3Modal();

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleWalletConnect = () => {
    setModalOpen(false);
    open();
  };

  const handleMetamask = () => {
    setModalOpen(false);
  };

  return (
    <>
      <RoundedButton label="Connect" color={blue[700]} callback={handleOpen} />
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h5" sx={typoStyle}>
            Choose a Wallet
          </Typography>
          <VerticalSpacer spacing={2} />
          <ImageButtonPanel imgSrc="/metamask.webp" callback={handleMetamask} />
          <VerticalSpacer spacing={1} />
          <ImageButtonPanel
            imgSrc="/walletconnect.svg"
            callback={handleWalletConnect}
          />
        </Box>
      </Modal>
    </>
  );
}
