import * as React from "react";
import { useMetaMask } from "metamask-react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 320,
  paddingTop: 3,
  paddingBottom: 2,
  border: "3px solid #34495E",
  borderRadius: 5,
};

const mediaStyle = {
  height: 150,
  width: 150,
};

const labelStyle = {
  fontFamily: "Ubuntu",
  fontSize: 24,
  fontWeight: "bold",
};

const contentStyle = {
  color: "#34495E",
  textAlign: "center",
};

export default function NftCard({ metadata, handlers }) {
  const { status } = useMetaMask();
  const { id, name, image, requires, amount } = metadata;
  const { mintHandler, burnHandler, openModalHandler } = handlers;

  return (
    <Card sx={cardStyle}>
      <CardMedia sx={mediaStyle} image={image} title={name} />
      <CardContent sx={contentStyle}>
        <Typography sx={labelStyle}>{name}</Typography>
        <Typography sx={{ fontSize: 14 }}>
          {requires.length === 0 ? "Free" : `${requires.join(", ")}`}
        </Typography>
        {status === "connected" ? (
          <Typography sx={{ fontSize: 18 }}>{amount} Owned</Typography>
        ) : (
          <Typography sx={{ fontSize: 18 }}>&nbsp;</Typography>
        )}
      </CardContent>
      {status === "connected" && (
        <CardActions>
          <Button
            variant="contained"
            size="medium"
            onClick={() => mintHandler(id)}
          >
            {id <= 2 ? "Mint" : "Forge"}
          </Button>
          <Button
            variant="contained"
            size="medium"
            color={id <= 2 ? "primary" : "error"}
            onClick={() => (id <= 2 ? openModalHandler(id) : burnHandler(id))}
          >
            {id <= 2 ? "Trade" : "Burn"}
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
