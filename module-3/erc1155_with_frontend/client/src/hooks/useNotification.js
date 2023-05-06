import { useState } from "react";

export const useNotification = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [alertMessage, setAlertMessage] = useState({
    success: "",
    error: "",
  });

  const setAlert = (alert) => {
    setIsAlert(alert);
  };

  const setMessage = (msg) => {
    setAlertMessage(msg);
  };

  const setSuccess = (res) => {
    setIsSuccess(res);
  };

  return { isAlert, setAlert, alertMessage, setMessage, isSuccess, setSuccess };
};
