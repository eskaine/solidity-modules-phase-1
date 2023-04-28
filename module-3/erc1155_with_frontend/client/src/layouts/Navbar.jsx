import Typography from "@mui/material/Typography";
import styles from "@/styles/Navbar.module.css";
import { grey } from "@mui/material/colors";
import { Web3Button } from '@web3modal/react';

const typoStyle = {
    color: grey[700]
};

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Typography variant="h5" sx={typoStyle}>ERC1155 Game Items</Typography>
      <Web3Button />
    </div>
  );
}
