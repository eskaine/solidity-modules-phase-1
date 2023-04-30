import { useState } from "react";

export const useNotification = () => {
    const [isAlert, setIsAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(null);

    const setAlert = (alert) => {
        setIsAlert(alert);
    }

    const setSuccess = (res) => {
        setIsSuccess(res);
    }

    return {isAlert, setAlert, isSuccess, setSuccess};
};

