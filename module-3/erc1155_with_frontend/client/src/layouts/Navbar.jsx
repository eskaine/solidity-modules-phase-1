import Typography from "@mui/material/Typography";
import { blue, green, grey } from "@mui/material/colors";
import RoundedButton from "@/components/RoundedButton";
import { Container, Box } from "@mui/material";
import { flexCenterStyle } from "@/styles/styles";

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

export default function Navbar({ account, connect }) {
  return (
    <Box sx={boxStyle}>
      <Container sx={navStyle}>
        <Typography variant="h5" sx={typoStyle}>
          ERC1155 Game Items
        </Typography>
        {!account ? (
          <RoundedButton label="Connect" color="info" callback={connect} />
        ) : (
          <RoundedButton label={account} color="info" />
        )}
      </Container>
    </Box>
  );
}
