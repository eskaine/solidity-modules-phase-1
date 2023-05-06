import { Alert, Snackbar } from "@mui/material";

export default function CooldownAlert({ cooldown, isAlert, alertCallback }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={isAlert}
      autoHideDuration={3000}
      onClose={alertCallback}
    >
      <Alert severity="warning">You may only mint after {cooldown} seconds!</Alert>
    </Snackbar>
  );
}
