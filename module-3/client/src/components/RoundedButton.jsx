import React from "react";
import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";

const style = {
  width: "150px",
  borderRadius: 28,
};

export default function RoundedButton({ label, color, callback }) {
  return (
    <Button variant="contained" sx={style} color={color} onClick={callback}>
      {label.length > 10 ? `${label.substring(0, 3)}****${label.substring(label.length - 3)}`: label}
    </Button>
  );
}
