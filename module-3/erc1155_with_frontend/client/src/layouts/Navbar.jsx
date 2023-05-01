import Typography from "@mui/material/Typography";
import { blue, grey } from "@mui/material/colors";
import { Container, Box, Link } from "@mui/material";
import RoundedButton from "@/components/RoundedButton";
import { flexCenterStyle } from "@/styles/styles";
import { useWallet } from "@/hooks/useWallet";
import { OPENSEA_URL } from "@/utils/constants";

const typoStyle = {
  color: grey[100],
};

const boxStyle = {
  ...flexCenterStyle,
  height: 80,
  backgroundColor: blue[800],
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const infoBoxStyle = {
  ...flexCenterStyle,
  gap: "20px",
};

const linkStyle = {
  color: "#fff",
  fontFamily: "Ubuntu",
  fontSize: 20
}

export default function Navbar() {
  const { balance, account, status, connectHandler } = useWallet();

  return (
    <Box sx={boxStyle}>
      <Container sx={navStyle}>
        <Typography variant="h5" sx={typoStyle}>
          ERC1155 Game Items
        </Typography>
        <Link sx={linkStyle} href={OPENSEA_URL + account} target="_blank">View @ Opensea</Link>
        {status === "connected" ? (
          <Box sx={infoBoxStyle}>
            <Typography variant="h6" sx={typoStyle}>
              {balance} MATIC
            </Typography>
            <RoundedButton label={account} color="info" />
          </Box>
        ) : (
          <RoundedButton
            label="Connect"
            color="info"
            callback={connectHandler}
          />
        )}
      </Container>
    </Box>
  );
}
