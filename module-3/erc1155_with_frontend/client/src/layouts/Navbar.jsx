import Typography from "@mui/material/Typography";
import Wallets from "@/features/Wallets";
import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Typography>ERC1155 Game Items</Typography>
      <Wallets />
    </div>
  );
}
