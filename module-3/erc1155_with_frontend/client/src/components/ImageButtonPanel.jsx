import React from "react";
import Button from "@mui/material/Button";
import Image from "next/image";
import { grey } from "@mui/material/colors";

const style = {
  backgroundColor: grey[200],
  borderRadius: 3,
  paddingLeft: "20px",
  paddingRight: "20px",
};

export default function ImageButtonPanel({ imgSrc, callback }) {
  return (
    <Button variant="contained" sx={style} onClick={callback}>
      <Image src={imgSrc} width={180} height={60} />
    </Button>
  );
}
