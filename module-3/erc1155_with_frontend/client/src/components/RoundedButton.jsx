import React from "react";
import Button from "@mui/material/Button";

const style = {
  borderRadius: 28,
  paddingLeft: "20px",
  paddingRight: "20px",
};

export default function RoundedButton({ label, color, callback }) {
  style.backgroundColor = color;

  return (
    <Button variant="contained" sx={style} onClick={callback}>
      {label}
    </Button>
  );
}
