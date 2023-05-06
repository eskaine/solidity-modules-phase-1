import * as React from "react";
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
  justifyContent: "space-between",
  width: 150,
  paddingTop: 3,
  paddingBottom: 2,
  border: "2px solid #34495E",
  borderRadius: 5,
};

const mediaStyle = {
  height: 60,
  width: 60,
};

const labelStyle = {
  fontFamily: "Ubuntu",
  fontSize: 16,
  fontWeight: "bold",
};

const contentStyle = {
  color: "#34495E",
  textAlign: "center",
};

export default function SimpleNftCard({ metadata, callback }) {
  const { name, image, requires, amount } = metadata;

  return (
    <Card sx={cardStyle}>
      <CardMedia sx={mediaStyle} image={image} title={name} />
      <CardContent sx={contentStyle}>
        <Typography sx={labelStyle}>{name}</Typography>
        <Typography sx={{ fontSize: 14 }}>
          {requires.length === 0 ? "Free" : `${requires.join(", ")}`}
        </Typography>
        <Typography sx={{ fontSize: 16 }}>{amount} Owned</Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small" onClick={callback}>Select</Button>
      </CardActions>
    </Card>
  );
}
