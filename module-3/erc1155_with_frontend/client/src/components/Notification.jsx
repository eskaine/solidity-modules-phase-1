import { Alert, Snackbar } from "@mui/material";

export default function Notification({ isAlert, isSuccess, alertCallback }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isAlert}
      autoHideDuration={3000}
      onClose={alertCallback}
    >
      {isSuccess ? (
        <Alert severity="success">Item minted successfully!</Alert>
      ) : (
        <Alert severity="error">Not enough items to mint!</Alert>
      )}
    </Snackbar>
  );
}
