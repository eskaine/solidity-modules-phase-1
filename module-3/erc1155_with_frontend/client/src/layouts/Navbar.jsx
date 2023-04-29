import Typography from "@mui/material/Typography";
import styles from "@/styles/Navbar.module.css";
import { grey, blue } from "@mui/material/colors";
import RoundedButton from "@/components/RoundedButton";

const typoStyle = {
  color: grey[700],
};

export default function Navbar({ account, connect }) {
  return (
    <div className={styles.navbar}>
      <Typography variant="h5" sx={typoStyle}>
        ERC1155 Game Items
      </Typography>
      {!account ? (
        <RoundedButton label="Connect" color={blue[700]} callback={connect} />
      ) : (
        <RoundedButton label={account} />
      )}
    </div>
  );
}
