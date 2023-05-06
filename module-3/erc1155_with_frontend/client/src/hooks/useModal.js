import { useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({id: 0});
  const handleOpen = (id) => {
    setData({id});
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  return { open, modalData: data, handleOpen, handleClose };
};
