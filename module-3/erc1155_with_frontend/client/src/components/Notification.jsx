import { Alert, Snackbar } from "@mui/material";

export default function Notification({ isAlert, isSuccess, alertMessages, alertCallback }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isAlert}
      autoHideDuration={3000}
      onClose={alertCallback}
    >
      {isSuccess ? (
        <Alert severity="success">{alertMessages["success"]}</Alert>
      ) : (
        <Alert severity="error">{alertMessages["error"]}</Alert>
      )}
    </Snackbar>
  );
}
